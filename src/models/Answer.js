const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  // Content
  body: {
    type: String,
    required: [true, 'Answer body is required'],
    trim: true,
    minlength: [20, 'Answer must be at least 20 characters long'],
    maxlength: [10000, 'Answer cannot exceed 10000 characters']
  },
  bodyHtml: {
    type: String,
    default: ''
  },

  // Relationships
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Status
  status: {
    type: String,
    enum: ['active', 'deleted', 'moderated'],
    default: 'active'
  },

  // Statistics
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
  commentCount: {
    type: Number,
    default: 0
  },

  // Engagement metrics
  score: {
    type: Number,
    default: 0
  },

  // Acceptance
  isAccepted: {
    type: Boolean,
    default: false
  },
  acceptedAt: {
    type: Date
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // Moderation
  isLocked: {
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
    body: String,
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
answerSchema.index({ post: 1, createdAt: -1 });
answerSchema.index({ author: 1, createdAt: -1 });
answerSchema.index({ score: -1 });
answerSchema.index({ isAccepted: 1 });
answerSchema.index({ status: 1 });

// Virtual for answer URL
answerSchema.virtual('url').get(function() {
  return `/posts/${this.post}/answers/${this._id}`;
});

// Pre-save middleware
answerSchema.pre('save', function(next) {
  // Update score based on votes
  if (this.isModified('upvoteCount') || this.isModified('downvoteCount')) {
    this.score = this.upvoteCount - this.downvoteCount;
  }
  next();
});

// Instance method to update vote counts
answerSchema.methods.updateVoteCounts = function() {
  return this.model('Vote').aggregate([
    { $match: { answer: this._id } },
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

// Instance method to update comment count
answerSchema.methods.updateCommentCount = function() {
  return this.model('Comment').countDocuments({ answer: this._id, status: 'active' })
    .then(count => {
      this.commentCount = count;
      return this.save();
    });
};

// Instance method to mark as accepted
answerSchema.methods.markAsAccepted = function(userId) {
  this.isAccepted = true;
  this.acceptedAt = new Date();
  this.acceptedBy = userId;
  return this.save();
};

// Instance method to unmark as accepted
answerSchema.methods.unmarkAsAccepted = function() {
  this.isAccepted = false;
  this.acceptedAt = null;
  this.acceptedBy = null;
  return this.save();
};

// Instance method to soft delete
answerSchema.methods.softDelete = function(userId) {
  this.deletedAt = new Date();
  this.deletedBy = userId;
  this.status = 'deleted';
  return this.save();
};

// Instance method to restore
answerSchema.methods.restore = function() {
  this.deletedAt = null;
  this.deletedBy = null;
  this.status = 'active';
  return this.save();
};

// Instance method to add to edit history
answerSchema.methods.addEditHistory = function(editedBy, reason = '') {
  this.editHistory.push({
    body: this.body,
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

// Static method to find active answers
answerSchema.statics.findActive = function() {
  return this.find({ status: 'active', deletedAt: null });
};

// Static method to find accepted answers
answerSchema.statics.findAccepted = function() {
  return this.find({ isAccepted: true, status: 'active', deletedAt: null });
};

// Static method to get answers by post
answerSchema.statics.getByPost = function(postId, options = {}) {
  const {
    sort = 'score',
    limit = 20,
    skip = 0
  } = options;

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
    default:
      sortOptions = { score: -1, createdAt: -1 };
  }

  return this.find({
    post: postId,
    status: 'active',
    deletedAt: null
  })
  .sort(sortOptions)
  .skip(skip)
  .limit(limit)
  .populate('author', 'displayName username avatar reputation')
  .populate('comments', 'body author createdAt');
};

module.exports = mongoose.model('Answer', answerSchema);
