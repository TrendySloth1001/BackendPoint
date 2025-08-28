const logger = require('../utils/logger');
const { ERROR_CODES } = require('../utils/constants');

/**
 * Custom error class for application errors
 */
class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || ERROR_CODES.INTERNAL_SERVER_ERROR;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Centralized error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404, ERROR_CODES.NOT_FOUND);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value: ${field}. Please use another value.`;
    error = new AppError(message, 400, ERROR_CODES.CONFLICT);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new AppError(message, 400, ERROR_CODES.VALIDATION_ERROR);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new AppError(message, 401, ERROR_CODES.AUTHENTICATION_ERROR);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new AppError(message, 401, ERROR_CODES.AUTHENTICATION_ERROR);
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File too large';
    error = new AppError(message, 400, ERROR_CODES.VALIDATION_ERROR);
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Unexpected file field';
    error = new AppError(message, 400, ERROR_CODES.VALIDATION_ERROR);
  }

  // Rate limit errors
  if (err.status === 429) {
    const message = 'Too many requests, please try again later';
    error = new AppError(message, 429, ERROR_CODES.RATE_LIMIT_EXCEEDED);
  }

  // Default error response
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  const code = error.code || ERROR_CODES.INTERNAL_SERVER_ERROR;

  // Development error response
  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      code,
      message,
      stack: err.stack,
      error: err
    });
  }

  // Production error response
  res.status(statusCode).json({
    code,
    message: statusCode === 500 ? 'Internal Server Error' : message
  });
};

/**
 * Async error wrapper to catch async errors
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Not found middleware
 */
const notFound = (req, res, next) => {
  const error = new AppError(
    `Route ${req.originalUrl} not found`,
    404,
    ERROR_CODES.NOT_FOUND
  );
  next(error);
};

module.exports = {
  AppError,
  errorHandler,
  asyncHandler,
  notFound
};
