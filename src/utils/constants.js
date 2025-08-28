// User roles and permissions
const USER_ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

const USER_PERMISSIONS = {
  CREATE_POST: 'create_post',
  EDIT_OWN_POST: 'edit_own_post',
  DELETE_OWN_POST: 'delete_own_post',
  VOTE: 'vote',
  COMMENT: 'comment',
  MODERATE_CONTENT: 'moderate_content',
  MANAGE_USERS: 'manage_users',
  MANAGE_SPACES: 'manage_spaces',
  VIEW_ANALYTICS: 'view_analytics'
};

// Post types and modes
const POST_MODES = {
  QUESTION: 'question',
  DISCUSSION: 'discussion'
};

const POST_STATUS = {
  ACTIVE: 'active',
  CLOSED: 'closed',
  DELETED: 'deleted',
  MODERATED: 'moderated'
};

// Vote types
const VOTE_TYPES = {
  UPVOTE: 1,
  DOWNVOTE: -1,
  NONE: 0
};

// Notification types
const NOTIFICATION_TYPES = {
  NEW_ANSWER: 'new_answer',
  ANSWER_ACCEPTED: 'answer_accepted',
  NEW_COMMENT: 'new_comment',
  POST_VOTED: 'post_voted',
  ANSWER_VOTED: 'answer_voted',
  COMMENT_VOTED: 'comment_voted',
  POST_MODERATED: 'post_moderated',
  USER_MENTIONED: 'user_mentioned',
  SPACE_INVITATION: 'space_invitation',
  REPUTATION_CHANGE: 'reputation_change'
};

// Report reasons
const REPORT_REASONS = {
  SPAM: 'spam',
  HARASSMENT: 'harassment',
  INAPPROPRIATE: 'inappropriate',
  DUPLICATE: 'duplicate',
  OFF_TOPIC: 'off_topic',
  OTHER: 'other'
};

// Reputation points for different actions
const REPUTATION_POINTS = {
  POST_UPVOTED: 10,
  POST_DOWNVOTED: -2,
  ANSWER_UPVOTED: 15,
  ANSWER_DOWNVOTED: -2,
  ANSWER_ACCEPTED: 15,
  COMMENT_UPVOTED: 2,
  COMMENT_DOWNVOTED: -1,
  POST_CREATED: 5,
  ANSWER_CREATED: 2,
  COMMENT_CREATED: 1
};

// Badge types and criteria
const BADGE_TYPES = {
  QUESTION_ASKER: 'question_asker',
  ANSWERER: 'answerer',
  COMMENTATOR: 'commentator',
  VOTER: 'voter',
  MODERATOR: 'moderator',
  HELPFUL: 'helpful',
  POPULAR: 'popular',
  DEDICATED: 'dedicated'
};

// Pagination defaults
const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1
};

// Rate limiting
const RATE_LIMITS = {
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // 5 requests per window
  },
  GENERAL: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // 100 requests per window
  },
  UPLOAD: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10 // 10 uploads per hour
  }
};

// File upload
const UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain', 'application/msword'],
  UPLOAD_PATH: './uploads'
};

// JWT configuration
const JWT = {
  ACCESS_TOKEN_EXPIRY: process.env.JWT_EXPIRES_IN || '15m',
  REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  VERIFICATION_TOKEN_EXPIRY: '24h',
  RESET_TOKEN_EXPIRY: '1h'
};

// Search configuration
const SEARCH = {
  MIN_QUERY_LENGTH: 2,
  MAX_RESULTS: 50,
  HIGHLIGHT_FIELDS: ['title', 'body', 'tags']
};

// Space configuration
const SPACE = {
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_RULES_LENGTH: 2000,
  MAX_TAGS_PER_SPACE: 20
};

// Post configuration
const POST = {
  MAX_TITLE_LENGTH: 300,
  MAX_BODY_LENGTH: 10000,
  MAX_TAGS_PER_POST: 10,
  MIN_TITLE_LENGTH: 10,
  MIN_BODY_LENGTH: 20
};

// Comment configuration
const COMMENT = {
  MAX_LENGTH: 1000,
  MIN_LENGTH: 1
};

// Cache configuration
const CACHE = {
  TTL: 300, // 5 minutes
  MAX_KEYS: 1000
};

// Error codes
const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  FORBIDDEN: 'FORBIDDEN'
};

module.exports = {
  USER_ROLES,
  USER_PERMISSIONS,
  POST_MODES,
  POST_STATUS,
  VOTE_TYPES,
  NOTIFICATION_TYPES,
  REPORT_REASONS,
  REPUTATION_POINTS,
  BADGE_TYPES,
  PAGINATION,
  RATE_LIMITS,
  UPLOAD,
  JWT,
  SEARCH,
  SPACE,
  POST,
  COMMENT,
  CACHE,
  ERROR_CODES
};
