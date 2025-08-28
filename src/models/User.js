const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { USER_ROLES, USER_PERMISSIONS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  // Basic information
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false // Don't include password in queries by default
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    trim: true,
    minlength: [2, 'Display name must be at least 2 characters long'],
    maxlength: [50, 'Display name cannot exceed 50 characters']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens']
  },

  // Profile information
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    match: [/^https?:\/\/.+/, 'Website must be a valid URL'],
    default: ''
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot exceed 100 characters'],
    default: ''
  },

  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  emailVerificationExpires: {
    type: Date,
    select: false
  },

  // Password reset
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },

  // Role and permissions
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.USER
  },
  permissions: [{
    type: String,
    enum: Object.values(USER_PERMISSIONS)
  }],

  // Reputation and statistics
  reputation: {
    type: Number,
    default: 1,
    min: 1
  },
  reputationHistory: [{
    points: {
      type: Number,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],

  // Activity statistics
  stats: {
    questionsAsked: {
      type: Number,
      default: 0
    },
    answersGiven: {
      type: Number,
      default: 0
    },
    answersAccepted: {
      type: Number,
      default: 0
    },
    commentsMade: {
      type: Number,
      default: 0
    },
    totalVotes: {
      type: Number,
      default: 0
    },
    upvotesReceived: {
      type: Number,
      default: 0
    },
    downvotesReceived: {
      type: Number,
      default: 0
    }
  },

  // Badges
  badges: [{
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    awardedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Preferences
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    pushNotifications: {
      type: Boolean,
      default: true
    },
    publicProfile: {
      type: Boolean,
      default: true
    },
    showEmail: {
      type: Boolean,
      default: false
    }
  },

  // Social connections
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Spaces the user is a member of
  spaces: [{
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Space'
    },
    role: {
      type: String,
      enum: ['member', 'moderator', 'owner'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Last activity
  lastSeen: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ reputation: -1 });
userSchema.index({ 'stats.questionsAsked': -1 });
userSchema.index({ 'stats.answersGiven': -1 });
userSchema.index({ createdAt: -1 });

// Virtual for full profile URL
userSchema.virtual('profileUrl').get(function() {
  return `/users/${this.username}`;
});

// Virtual for avatar URL
userSchema.virtual('avatarUrl').get(function() {
  if (this.avatar) {
    return this.avatar.startsWith('http') ? this.avatar : `/uploads/avatars/${this.avatar}`;
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.displayName)}&size=200&background=random`;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Instance method to update reputation
userSchema.methods.updateReputation = function(points, reason) {
  this.reputation += points;
  this.reputationHistory.push({
    points,
    reason,
    timestamp: new Date()
  });

  // Keep only last 100 reputation changes
  if (this.reputationHistory.length > 100) {
    this.reputationHistory = this.reputationHistory.slice(-100);
  }

  return this.save();
};

// Instance method to add badge
userSchema.methods.addBadge = function(badgeType, badgeName, badgeDescription) {
  // Check if user already has this badge
  const hasBadge = this.badges.some(badge => badge.type === badgeType);
  if (hasBadge) return false;

  this.badges.push({
    type: badgeType,
    name: badgeName,
    description: badgeDescription
  });

  return this.save();
};

// Instance method to update stats
userSchema.methods.updateStats = function(field, increment = 1) {
  if (this.stats[field] !== undefined) {
    this.stats[field] += increment;
  }
  return this.save();
};

// Static method to find by email or username
userSchema.statics.findByEmailOrUsername = function(identifier) {
  return this.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { username: identifier }
    ]
  });
};

// Static method to get top users by reputation
userSchema.statics.getTopUsers = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ reputation: -1 })
    .limit(limit)
    .select('displayName username reputation avatar stats');
};

module.exports = mongoose.model('User', userSchema);
