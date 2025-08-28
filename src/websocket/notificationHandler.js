const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

// Store connected users
const connectedUsers = new Map();

/**
 * Setup WebSocket connection and event handlers
 */
const setupWebSocket = (io) => {
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user || !user.isActive) {
        return next(new Error('Invalid or inactive user'));
      }

      socket.userId = user._id;
      socket.user = user;
      next();
    } catch (error) {
      logger.error('WebSocket authentication error:', error);
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.user.email} (${socket.userId})`);

    // Add user to connected users map
    connectedUsers.set(socket.userId.toString(), {
      socketId: socket.id,
      user: socket.user,
      connectedAt: new Date()
    });

    // Join user's personal room for notifications
    socket.join(`user:${socket.userId}`);

    // Join spaces the user is a member of
    socket.user.spaces.forEach(spaceMembership => {
      socket.join(`space:${spaceMembership.space}`);
    });

    // Handle user joining a space
    socket.on('join-space', (spaceId) => {
      socket.join(`space:${spaceId}`);
      logger.info(`User ${socket.userId} joined space ${spaceId}`);
    });

    // Handle user leaving a space
    socket.on('leave-space', (spaceId) => {
      socket.leave(`space:${spaceId}`);
      logger.info(`User ${socket.userId} left space ${spaceId}`);
    });

    // Handle typing indicators
    socket.on('typing-start', (data) => {
      const { spaceId, postId } = data;
      socket.to(`space:${spaceId}`).emit('user-typing', {
        userId: socket.userId,
        username: socket.user.username,
        displayName: socket.user.displayName,
        postId,
        isTyping: true
      });
    });

    socket.on('typing-stop', (data) => {
      const { spaceId, postId } = data;
      socket.to(`space:${spaceId}`).emit('user-typing', {
        userId: socket.userId,
        username: socket.user.username,
        displayName: socket.user.displayName,
        postId,
        isTyping: false
      });
    });

    // Handle online status
    socket.on('set-online-status', (status) => {
      socket.user.onlineStatus = status;
      socket.to(`user:${socket.userId}`).emit('user-status-change', {
        userId: socket.userId,
        status
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.user.email} (${socket.userId})`);
      
      // Remove user from connected users map
      connectedUsers.delete(socket.userId.toString());
      
      // Emit offline status to user's followers
      socket.to(`user:${socket.userId}`).emit('user-status-change', {
        userId: socket.userId,
        status: 'offline'
      });
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error('WebSocket error:', error);
    });
  });

  return io;
};

/**
 * Send notification to a specific user
 */
const sendNotificationToUser = (userId, notification) => {
  const userConnection = connectedUsers.get(userId.toString());
  
  if (userConnection) {
    const io = require('socket.io');
    io.to(userConnection.socketId).emit('notification', notification);
    logger.info(`Notification sent to user ${userId}: ${notification.type}`);
  }
};

/**
 * Send notification to multiple users
 */
const sendNotificationToUsers = (userIds, notification) => {
  userIds.forEach(userId => {
    sendNotificationToUser(userId, notification);
  });
};

/**
 * Send notification to all users in a space
 */
const sendNotificationToSpace = (spaceId, notification, excludeUserId = null) => {
  const io = require('socket.io');
  const room = `space:${spaceId}`;
  
  if (excludeUserId) {
    io.to(room).except(`user:${excludeUserId}`).emit('notification', notification);
  } else {
    io.to(room).emit('notification', notification);
  }
  
  logger.info(`Notification sent to space ${spaceId}: ${notification.type}`);
};

/**
 * Send notification to all connected users
 */
const broadcastNotification = (notification) => {
  const io = require('socket.io');
  io.emit('notification', notification);
  logger.info(`Broadcast notification sent: ${notification.type}`);
};

/**
 * Get online users count
 */
const getOnlineUsersCount = () => {
  return connectedUsers.size;
};

/**
 * Get online users in a space
 */
const getOnlineUsersInSpace = (spaceId) => {
  const onlineUsers = [];
  
  connectedUsers.forEach((userData, userId) => {
    const isInSpace = userData.user.spaces.some(space => 
      space.space.toString() === spaceId.toString()
    );
    
    if (isInSpace) {
      onlineUsers.push({
        userId,
        username: userData.user.username,
        displayName: userData.user.displayName,
        avatar: userData.user.avatarUrl,
        connectedAt: userData.connectedAt
      });
    }
  });
  
  return onlineUsers;
};

/**
 * Check if user is online
 */
const isUserOnline = (userId) => {
  return connectedUsers.has(userId.toString());
};

/**
 * Get user's connection info
 */
const getUserConnection = (userId) => {
  return connectedUsers.get(userId.toString());
};

/**
 * Send real-time post update
 */
const sendPostUpdate = (spaceId, postData) => {
  const io = require('socket.io');
  io.to(`space:${spaceId}`).emit('post-update', postData);
};

/**
 * Send real-time answer update
 */
const sendAnswerUpdate = (spaceId, answerData) => {
  const io = require('socket.io');
  io.to(`space:${spaceId}`).emit('answer-update', answerData);
};

/**
 * Send real-time comment update
 */
const sendCommentUpdate = (spaceId, commentData) => {
  const io = require('socket.io');
  io.to(`space:${spaceId}`).emit('comment-update', commentData);
};

/**
 * Send real-time vote update
 */
const sendVoteUpdate = (spaceId, voteData) => {
  const io = require('socket.io');
  io.to(`space:${spaceId}`).emit('vote-update', voteData);
};

module.exports = {
  setupWebSocket,
  sendNotificationToUser,
  sendNotificationToUsers,
  sendNotificationToSpace,
  broadcastNotification,
  getOnlineUsersCount,
  getOnlineUsersInSpace,
  isUserOnline,
  getUserConnection,
  sendPostUpdate,
  sendAnswerUpdate,
  sendCommentUpdate,
  sendVoteUpdate
};
