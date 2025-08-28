const mongoose = require('mongoose');
const { SPACE } = require('../utils/constants');

const spaceSchema = new mongoose.Schema({
  // Basic information
  name: {
    type: String,
    required: [true, 'Space name is required'],
    trim: true,
    minlength: [2, 'Space name must be at least 2 characters long'],
    maxlength: [SPACE.MAX_NAME_LENGTH, `Space name cannot exceed ${SPACE.MAX_NAME_LENGTH} characters`],
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Space description is required'],
    trim: true,
    maxlength: [SPACE.MAX_DESCRIPTION_LENGTH, `Description cannot exceed ${SPACE.MAX_DESCRIPTION_LENGTH} characters`]
  },
  rules: {
    type: String,
    maxlength: [SPACE.MAX_RULES_LENGTH, `Rules cannot exceed ${SPACE.MAX_RULES_LENGTH} characters`],
    default: ''
  },

  // Visual elements
  icon: {
    type: String,
    default: ''
  },
  banner: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#007bff',
    match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color']
  },

  // Settings
  isPublic: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  allowQuestions: {
    type: Boolean,
    default: true
  },
  allowDiscussions: {
    type: Boolean,
    default: true
  },
  requireApproval: {
    type: Boolean,
    default: false
  },
  allowAnonymous: {
    type: Boolean,
    default: false
  },

  // Membership
  memberCount: {
    type: Number,
    default: 0
  },
  postCount: {
    type: Number,
    default: 0
  },
  questionCount: {
    type: Number,
    default: 0
  },
  discussionCount: {
    type: Number,
    default: 0
  },

  // Default tags for this space
  defaultTags: [{
    type: String,
    trim: true,
    maxlength: [SPACE.MAX_TAGS_PER_SPACE, `Cannot have more than ${SPACE.MAX_TAGS_PER_SPACE} default tags`]
  }],

  // Moderators and owners
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moderators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Categories and topics
  categories: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    color: {
      type: String,
      default: '#6c757d'
    },
    order: {
      type: Number,
      default: 0
    }
  }],

  // Statistics
  stats: {
    totalViews: {
      type: Number,
      default: 0
    },
    totalVotes: {
      type: Number,
      default: 0
    },
    averageResponseTime: {
      type: Number, // in hours
      default: 0
    },
    unansweredQuestions: {
      type: Number,
      default: 0
    }
  },

  // Activity tracking
  lastActivity: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
spaceSchema.index({ slug: 1 });
spaceSchema.index({ name: 'text', description: 'text' });
spaceSchema.index({ isPublic: 1, isActive: 1 });
spaceSchema.index({ memberCount: -1 });
spaceSchema.index({ postCount: -1 });
spaceSchema.index({ createdAt: -1 });
spaceSchema.index({ lastActivity: -1 });

// Virtual for space URL
spaceSchema.virtual('url').get(function() {
  return `/spaces/${this.slug}`;
});

// Virtual for icon URL
spaceSchema.virtual('iconUrl').get(function() {
  if (this.icon) {
    return this.icon.startsWith('http') ? this.icon : `/uploads/spaces/icons/${this.icon}`;
  }
  return '';
});

// Virtual for banner URL
spaceSchema.virtual('bannerUrl').get(function() {
  if (this.banner) {
    return this.banner.startsWith('http') ? this.banner : `/uploads/spaces/banners/${this.banner}`;
  }
  return '';
});

// Pre-save middleware to generate slug
spaceSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  this.updatedAt = new Date();
  next();
});

// Instance method to add moderator
spaceSchema.methods.addModerator = function(userId, addedByUserId) {
  // Check if user is already a moderator
  const isModerator = this.moderators.some(mod => mod.user.toString() === userId.toString());
  if (isModerator) return false;

  this.moderators.push({
    user: userId,
    addedBy: addedByUserId
  });

  return this.save();
};

// Instance method to remove moderator
spaceSchema.methods.removeModerator = function(userId) {
  this.moderators = this.moderators.filter(mod => mod.user.toString() !== userId.toString());
  return this.save();
};

// Instance method to check if user is moderator
spaceSchema.methods.isModerator = function(userId) {
  return this.moderators.some(mod => mod.user.toString() === userId.toString());
};

// Instance method to check if user is owner
spaceSchema.methods.isOwner = function(userId) {
  return this.owner.toString() === userId.toString();
};

// Instance method to check if user can moderate
spaceSchema.methods.canModerate = function(userId) {
  return this.isOwner(userId) || this.isModerator(userId);
};

// Instance method to update stats
spaceSchema.methods.updateStats = function(field, increment = 1) {
  if (this.stats[field] !== undefined) {
    this.stats[field] += increment;
  }
  return this.save();
};

// Instance method to increment member count
spaceSchema.methods.incrementMemberCount = function() {
  this.memberCount += 1;
  return this.save();
};

// Instance method to decrement member count
spaceSchema.methods.decrementMemberCount = function() {
  this.memberCount = Math.max(0, this.memberCount - 1);
  return this.save();
};

// Instance method to increment post count
spaceSchema.methods.incrementPostCount = function(type = 'post') {
  this.postCount += 1;
  if (type === 'question') {
    this.questionCount += 1;
  } else if (type === 'discussion') {
    this.discussionCount += 1;
  }
  return this.save();
};

// Instance method to decrement post count
spaceSchema.methods.decrementPostCount = function(type = 'post') {
  this.postCount = Math.max(0, this.postCount - 1);
  if (type === 'question') {
    this.questionCount = Math.max(0, this.questionCount - 1);
  } else if (type === 'discussion') {
    this.discussionCount = Math.max(0, this.discussionCount - 1);
  }
  return this.save();
};

// Static method to find public spaces
spaceSchema.statics.findPublic = function() {
  return this.find({ isPublic: true, isActive: true });
};

// Static method to search spaces
spaceSchema.statics.search = function(query, limit = 10) {
  return this.find({
    $and: [
      { isPublic: true, isActive: true },
      {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      }
    ]
  })
  .sort({ memberCount: -1, postCount: -1 })
  .limit(limit);
};

// Static method to get trending spaces
spaceSchema.statics.getTrending = function(limit = 10) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return this.aggregate([
    {
      $match: {
        isPublic: true,
        isActive: true,
        lastActivity: { $gte: oneWeekAgo }
      }
    },
    {
      $addFields: {
        activityScore: {
          $add: [
            { $multiply: ['$memberCount', 0.1] },
            { $multiply: ['$postCount', 0.5] },
            { $multiply: ['$stats.totalViews', 0.01] }
          ]
        }
      }
    },
    {
      $sort: { activityScore: -1 }
    },
    {
      $limit: limit
    }
  ]);
};

module.exports = mongoose.model('Space', spaceSchema);
