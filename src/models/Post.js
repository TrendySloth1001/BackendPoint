const mongoose = require('mongoose');
const { POST_MODES, POST_STATUS, POST } = require('../utils/constants');

const postSchema = new mongoose.Schema({
  // Basic information
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    minlength: [POST.MIN_TITLE_LENGTH, `Title must be at least ${POST.MIN_TITLE_LENGTH} characters long`],
    maxlength: [POST.MAX_TITLE_LENGTH, `Title cannot exceed ${POST.MAX_TITLE_LENGTH} characters`]
  },
  body: {
    type: String,
    required: [true, 'Post body is required'],
    trim: true,
    minlength: [POST.MIN_BODY_LENGTH, `Body must be at least ${POST.MIN_BODY_LENGTH} characters long`],
    maxlength: [POST.MAX_BODY_LENGTH, `Body cannot exceed ${POST.MAX_BODY_LENGTH} characters`]
  },
  bodyHtml: {
    type: String,
    default: ''
  },

  // Post type and status
  mode: {
    type: String,
    enum: Object.values(POST_MODES),
    required: true
  },
  status: {
    type: String,
    enum: Object.values(POST_STATUS),
    default: POST_STATUS.ACTIVE
  },

  // Author and space
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  space: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: true
  },

  // Tags
  tags: [{
    type: String,
    trim: true,
    maxlength: [POST.MAX_TAGS_PER_POST, `Cannot have more than ${POST.MAX_TAGS_PER_POST} tags`]
  }],

  // Question-specific fields
  isAnswered: {
    type: Boolean,
    default: false
  },
  acceptedAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  },
  bounty: {
    amount: {
      type: Number,
      default: 0
    },
    expiresAt: {
      type: Date
    }
  },

  // Statistics
  viewCount: {
    type: Number,
    default: 0
  },
  answerCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  },
  voteCount: {
    type: Number,
    default: 0
  },
  upvoteCount: {
    type: Number,
    default: 0
  },
  downvoteCount: {
    type: Number,
    default: 0
  },

  // Engagement metrics
  score: {
    type: Number,
    default: 0
  },
  hotScore: {
    type: Number,
    default: 0
  },

  // Moderation
  isLocked: {
    type: Boolean,
    default: false
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  moderationNotes: {
    type: String,
    maxlength: [1000, 'Moderation notes cannot exceed 1000 characters']
  },

  // Soft delete
  deletedAt: {
    type: Date,
    default: null
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // Edit history
  editHistory: [{
    title: String,
    body: String,
    tags: [String],
    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    editedAt: {
      type: Date,
      default: Date.now
    },
    reason: String
  }],

  // Timestamps
  lastActivity: {
    type: Date,
    default: Date.now
  },
  lastEditedAt: {
    type: Date
  },
  lastEditedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
postSchema.index({ title: 'text', body: 'text', tags: 'text' });
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ space: 1, createdAt: -1 });
postSchema.index({ space: 1, mode: 1, status: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ score: -1 });
postSchema.index({ hotScore: -1 });
postSchema.index({ viewCount: -1 });
postSchema.index({ answerCount: -1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ lastActivity: -1 });
postSchema.index({ isAnswered: 1, createdAt: -1 });
postSchema.index({ isFeatured: 1, createdAt: -1 });
postSchema.index({ isPinned: 1, createdAt: -1 });

// Virtual for post URL
postSchema.virtual('url').get(function() {
  return `/posts/${this._id}`;
});

// Virtual for space URL
postSchema.virtual('spaceUrl').get(function() {
  return `/spaces/${this.space?.slug || this.space}`;
});

// Virtual for author URL
postSchema.virtual('authorUrl').get(function() {
  return `/users/${this.author?.username || this.author}`;
});

// Virtual for is question
postSchema.virtual('isQuestion').get(function() {
  return this.mode === POST_MODES.QUESTION;
});

// Virtual for is discussion
postSchema.virtual('isDiscussion').get(function() {
  return this.mode === POST_MODES.DISCUSSION;
});

// Virtual for can be answered
postSchema.virtual('canBeAnswered').get(function() {
  return this.isQuestion && !this.isAnswered && this.status === POST_STATUS.ACTIVE;
});

// Pre-save middleware to update last activity
postSchema.pre('save', function(next) {
  this.lastActivity = new Date();
  
  // Update hot score based on votes and time
  if (this.isModified('upvoteCount') || this.isModified('downvoteCount') || this.isModified('createdAt')) {
    const age = (Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60); // hours
    const score = this.upvoteCount - this.downvoteCount;
    this.hotScore = Math.log10(Math.max(Math.abs(score), 1)) + (age / 45000);
  }
  
  next();
});

// Instance method to increment view count
postSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// Instance method to update vote counts
postSchema.methods.updateVoteCounts = function() {
  return this.model('Vote').aggregate([
    { $match: { post: this._id } },
    {
      $group: {
        _id: null,
        totalVotes: { $sum: 1 },
        upvotes: { $sum: { $cond: [{ $eq: ['$value', 1] }, 1, 0] } },
        downvotes: { $sum: { $cond: [{ $eq: ['$value', -1] }, 1, 0] } }
      }
    }
  ]).then(results => {
    if (results.length > 0) {
      const result = results[0];
      this.voteCount = result.totalVotes;
      this.upvoteCount = result.upvotes;
      this.downvoteCount = result.downvotes;
      this.score = result.upvotes - result.downvotes;
      return this.save();
    }
    return this;
  });
};

// Instance method to update answer count
postSchema.methods.updateAnswerCount = function() {
  return this.model('Answer').countDocuments({ post: this._id, status: 'active' })
    .then(count => {
      this.answerCount = count;
      return this.save();
    });
};

// Instance method to update comment count
postSchema.methods.updateCommentCount = function() {
  return this.model('Comment').countDocuments({ post: this._id, status: 'active' })
    .then(count => {
      this.commentCount = count;
      return this.save();
    });
};

// Instance method to mark as answered
postSchema.methods.markAsAnswered = function(answerId) {
  this.isAnswered = true;
  this.acceptedAnswer = answerId;
  return this.save();
};

// Instance method to unmark as answered
postSchema.methods.unmarkAsAnswered = function() {
  this.isAnswered = false;
  this.acceptedAnswer = null;
  return this.save();
};

// Instance method to soft delete
postSchema.methods.softDelete = function(userId) {
  this.deletedAt = new Date();
  this.deletedBy = userId;
  this.status = POST_STATUS.DELETED;
  return this.save();
};

// Instance method to restore
postSchema.methods.restore = function() {
  this.deletedAt = null;
  this.deletedBy = null;
  this.status = POST_STATUS.ACTIVE;
  return this.save();
};

// Instance method to add to edit history
postSchema.methods.addEditHistory = function(editedBy, reason = '') {
  this.editHistory.push({
    title: this.title,
    body: this.body,
    tags: this.tags,
    editedBy,
    reason
  });
  
  // Keep only last 10 edits
  if (this.editHistory.length > 10) {
    this.editHistory = this.editHistory.slice(-10);
  }
  
  this.lastEditedAt = new Date();
  this.lastEditedBy = editedBy;
  return this.save();
};

// Static method to find active posts
postSchema.statics.findActive = function() {
  return this.find({ status: POST_STATUS.ACTIVE, deletedAt: null });
};

// Static method to find questions
postSchema.statics.findQuestions = function() {
  return this.find({ mode: POST_MODES.QUESTION, status: POST_STATUS.ACTIVE, deletedAt: null });
};

// Static method to find discussions
postSchema.statics.findDiscussions = function() {
  return this.find({ mode: POST_MODES.DISCUSSION, status: POST_STATUS.ACTIVE, deletedAt: null });
};

// Static method to find unanswered questions
postSchema.statics.findUnanswered = function() {
  return this.find({
    mode: POST_MODES.QUESTION,
    status: POST_STATUS.ACTIVE,
    deletedAt: null,
    isAnswered: false
  });
};

// Static method to get trending posts
postSchema.statics.getTrending = function(limit = 10) {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  return this.find({
    status: POST_STATUS.ACTIVE,
    deletedAt: null,
    createdAt: { $gte: oneDayAgo }
  })
  .sort({ hotScore: -1 })
  .limit(limit);
};

// Static method to search posts
postSchema.statics.search = function(query, options = {}) {
  const {
    space,
    mode,
    tags,
    author,
    sort = 'relevance',
    limit = 20,
    skip = 0
  } = options;

  let searchQuery = {
    status: POST_STATUS.ACTIVE,
    deletedAt: null
  };

  // Text search
  if (query) {
    searchQuery.$text = { $search: query };
  }

  // Filters
  if (space) searchQuery.space = space;
  if (mode) searchQuery.mode = mode;
  if (author) searchQuery.author = author;
  if (tags && tags.length > 0) {
    searchQuery.tags = { $in: tags };
  }

  let sortOptions = {};
  switch (sort) {
    case 'newest':
      sortOptions = { createdAt: -1 };
      break;
    case 'oldest':
      sortOptions = { createdAt: 1 };
      break;
    case 'votes':
      sortOptions = { score: -1 };
      break;
    case 'views':
      sortOptions = { viewCount: -1 };
      break;
    case 'answers':
      sortOptions = { answerCount: -1 };
      break;
    case 'activity':
      sortOptions = { lastActivity: -1 };
      break;
    default:
      sortOptions = { score: { $meta: 'textScore' } };
  }

  return this.find(searchQuery)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);
};

module.exports = mongoose.model('Post', postSchema);
