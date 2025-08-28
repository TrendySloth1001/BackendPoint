const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ERROR_CODES } = require('../utils/constants');
const logger = require('../utils/logger');

/**
 * Middleware to authenticate JWT token
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Access token is required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Invalid token - user not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Account is deactivated'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Token verification failed:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Token has expired'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Invalid token'
      });
    }

    return res.status(500).json({
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: 'Token verification failed'
    });
  }
};

/**
 * Middleware to authenticate refresh token
 */
const authenticateRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Refresh token is required'
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Invalid refresh token - user not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Account is deactivated'
      });
    }

    req.user = user;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    logger.error('Refresh token verification failed:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Refresh token has expired'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Invalid refresh token'
      });
    }

    return res.status(500).json({
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: 'Refresh token verification failed'
    });
  }
};

/**
 * Middleware to check if user has required role
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        code: ERROR_CODES.AUTHORIZATION_ERROR,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

/**
 * Middleware to check if user has required permission
 */
const requirePermission = (...permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        code: ERROR_CODES.AUTHENTICATION_ERROR,
        message: 'Authentication required'
      });
    }

    // Super admin has all permissions
    if (req.user.role === 'super_admin') {
      return next();
    }

    // Check if user has any of the required permissions
    const hasPermission = permissions.some(permission => 
      req.user.permissions && req.user.permissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({
        code: ERROR_CODES.AUTHORIZATION_ERROR,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

/**
 * Middleware to check if user owns the resource or has admin role
 */
const requireOwnership = (resourceModel, resourceIdParam = 'id') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          code: ERROR_CODES.AUTHENTICATION_ERROR,
          message: 'Authentication required'
        });
      }

      // Admin and super admin can access any resource
      if (['admin', 'super_admin'].includes(req.user.role)) {
        return next();
      }

      const resourceId = req.params[resourceIdParam];
      const resource = await resourceModel.findById(resourceId);

      if (!resource) {
        return res.status(404).json({
          code: ERROR_CODES.NOT_FOUND,
          message: 'Resource not found'
        });
      }

      // Check if user owns the resource
      if (resource.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          code: ERROR_CODES.AUTHORIZATION_ERROR,
          message: 'Access denied - you can only modify your own resources'
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      logger.error('Ownership check failed:', error);
      return res.status(500).json({
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: 'Ownership verification failed'
      });
    }
  };
};

/**
 * Optional authentication middleware - doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (user && user.isActive) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Don't fail on token errors, just continue without user
    next();
  }
};

module.exports = {
  authenticateToken,
  authenticateRefreshToken,
  requireRole,
  requirePermission,
  requireOwnership,
  optionalAuth
};
