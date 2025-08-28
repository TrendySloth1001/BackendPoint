const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');
const { ERROR_CODES, JWT } = require('../utils/constants');
const emailService = require('../config/email');
const logger = require('../utils/logger');

/**
 * Generate JWT tokens
 */
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: JWT.ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: JWT.REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
};

/**
 * Register new user
 * POST /api/v1/auth/signup
 */
const signup = async (req, res, next) => {
  try {
    const { email, password, displayName, username } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmailOrUsername(email);
    if (existingUser) {
      throw new AppError('User with this email or username already exists', 400, ERROR_CODES.CONFLICT);
    }

    // Check if username is taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new AppError('Username is already taken', 400, ERROR_CODES.CONFLICT);
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = new User({
      email,
      password,
      displayName,
      username,
      emailVerificationToken,
      emailVerificationExpires
    });

    await user.save();

    // Send verification email
    if (emailService.isConfigured) {
      await emailService.sendVerificationEmail(email, emailVerificationToken, displayName);
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Update user's last activity
    user.lastActivity = new Date();
    await user.save();

    logger.info(`New user registered: ${user.email}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email to verify your account.',
      data: {
        user: {
          id: user._id,
          email: user.email,
          displayName: user.displayName,
          username: user.username,
          isEmailVerified: user.isEmailVerified,
          reputation: user.reputation,
          role: user.role
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * User login
 * POST /api/v1/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      throw new AppError('Email/username and password are required', 400, ERROR_CODES.VALIDATION_ERROR);
    }

    // Find user by email or username
    const user = await User.findByEmailOrUsername(identifier).select('+password');
    if (!user) {
      throw new AppError('Invalid credentials', 401, ERROR_CODES.AUTHENTICATION_ERROR);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError('Account is deactivated', 401, ERROR_CODES.AUTHENTICATION_ERROR);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401, ERROR_CODES.AUTHENTICATION_ERROR);
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Update last activity
    user.lastActivity = new Date();
    user.lastSeen = new Date();
    await user.save();

    logger.info(`User logged in: ${user.email}`);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          displayName: user.displayName,
          username: user.username,
          isEmailVerified: user.isEmailVerified,
          reputation: user.reputation,
          role: user.role,
          avatar: user.avatarUrl
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh access token
 * POST /api/v1/auth/refresh
 */
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      throw new AppError('Refresh token is required', 400, ERROR_CODES.VALIDATION_ERROR);
    }

    // Verify refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
    // Get user
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      throw new AppError('Invalid refresh token', 401, ERROR_CODES.AUTHENTICATION_ERROR);
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        tokens: {
          accessToken,
          refreshToken: newRefreshToken
        }
      }
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(new AppError('Refresh token has expired', 401, ERROR_CODES.AUTHENTICATION_ERROR));
    } else if (error.name === 'JsonWebTokenError') {
      next(new AppError('Invalid refresh token', 401, ERROR_CODES.AUTHENTICATION_ERROR));
    } else {
      next(error);
    }
  }
};

/**
 * User logout
 * POST /api/v1/auth/logout
 */
const logout = async (req, res, next) => {
  try {
    // In a real application, you might want to blacklist the refresh token
    // For now, we'll just return a success response
    // The client should remove the tokens from storage

    logger.info(`User logged out: ${req.user.email}`);

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 * GET /api/v1/auth/me
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('spaces.space', 'name slug icon')
      .populate('following', 'displayName username avatar reputation')
      .populate('followers', 'displayName username avatar reputation');

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          displayName: user.displayName,
          username: user.username,
          bio: user.bio,
          avatar: user.avatarUrl,
          website: user.website,
          location: user.location,
          isEmailVerified: user.isEmailVerified,
          reputation: user.reputation,
          role: user.role,
          permissions: user.permissions,
          stats: user.stats,
          badges: user.badges,
          preferences: user.preferences,
          spaces: user.spaces,
          following: user.following,
          followers: user.followers,
          lastSeen: user.lastSeen,
          lastActivity: user.lastActivity,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Send password reset email
 * POST /api/v1/auth/forgot
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError('Email is required', 400, ERROR_CODES.VALIDATION_ERROR);
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists or not for security
      return res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetTokenExpires;
    await user.save();

    // Send reset email
    if (emailService.isConfigured) {
      await emailService.sendPasswordResetEmail(email, resetToken, user.displayName);
    }

    logger.info(`Password reset requested for: ${email}`);

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset password
 * POST /api/v1/auth/reset
 */
const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      throw new AppError('Reset token and new password are required', 400, ERROR_CODES.VALIDATION_ERROR);
    }

    // Find user with reset token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    }).select('+password');

    if (!user) {
      throw new AppError('Invalid or expired reset token', 400, ERROR_CODES.VALIDATION_ERROR);
    }

    // Update password
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    logger.info(`Password reset successful for: ${user.email}`);

    res.json({
      success: true,
      message: 'Password has been reset successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify email
 * POST /api/v1/auth/verify-email
 */
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      throw new AppError('Verification token is required', 400, ERROR_CODES.VALIDATION_ERROR);
    }

    // Find user with verification token
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new AppError('Invalid or expired verification token', 400, ERROR_CODES.VALIDATION_ERROR);
    }

    // Verify email
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    logger.info(`Email verified for: ${user.email}`);

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Resend verification email
 * POST /api/v1/auth/resend-verification
 */
const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError('Email is required', 400, ERROR_CODES.VALIDATION_ERROR);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('User not found', 404, ERROR_CODES.NOT_FOUND);
    }

    if (user.isEmailVerified) {
      throw new AppError('Email is already verified', 400, ERROR_CODES.VALIDATION_ERROR);
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationExpires = emailVerificationExpires;
    await user.save();

    // Send verification email
    if (emailService.isConfigured) {
      await emailService.sendVerificationEmail(email, emailVerificationToken, user.displayName);
    }

    logger.info(`Verification email resent to: ${email}`);

    res.json({
      success: true,
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  refreshToken,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification
};
