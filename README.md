# Community Q&A Platform Backend

A comprehensive Node.js backend for a community Q&A platform built with Express.js, MongoDB, and JWT authentication. This platform supports features similar to Stack Overflow and Reddit with advanced moderation, reputation systems, and real-time notifications.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with refresh tokens
- **User Management**: Profiles, reputation, badges, and statistics
- **Community Spaces**: Create and manage topic-based communities
- **Content Management**: Questions, answers, comments, and discussions
- **Voting System**: Upvote/downvote posts and answers
- **Search & Discovery**: Full-text search with filters
- **Moderation Tools**: Reporting, moderation queue, and admin actions
- **Real-time Notifications**: WebSocket-based notifications
- **Analytics**: Platform metrics and space health monitoring
- **Rate Limiting**: Configurable rate limiting for API protection
- **File Uploads**: Support for images and documents
- **Email Notifications**: Verification and notification emails

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- Redis (optional, for caching)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd community-qa-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup**
   ```bash
   # Start MongoDB
   mongod
   
   # Run migrations (if any)
   npm run migrate
   
   # Seed initial data (optional)
   npm run seed
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📁 Project Structure

```
src/
├── config/                 # Configuration files
│   ├── database.js        # MongoDB connection
│   ├── email.js           # Email service config
│   └── redis.js           # Redis configuration
├── controllers/           # Route controllers
│   ├── authController.js
│   ├── userController.js
│   ├── spaceController.js
│   ├── postController.js
│   ├── answerController.js
│   ├── commentController.js
│   ├── searchController.js
│   ├── moderationController.js
│   ├── notificationController.js
│   └── adminController.js
├── middleware/            # Custom middleware
│   ├── auth.js           # JWT authentication
│   ├── rateLimit.js      # Rate limiting
│   ├── validation.js     # Request validation
│   ├── upload.js         # File upload handling
│   └── errorHandler.js   # Error handling
├── models/               # MongoDB models
│   ├── User.js
│   ├── Space.js
│   ├── Post.js
│   ├── Answer.js
│   ├── Comment.js
│   ├── Vote.js
│   ├── Report.js
│   ├── Notification.js
│   └── Badge.js
├── routes/               # API routes
│   ├── auth.js
│   ├── users.js
│   ├── spaces.js
│   ├── posts.js
│   ├── answers.js
│   ├── comments.js
│   ├── search.js
│   ├── moderation.js
│   ├── notifications.js
│   └── admin.js
├── services/             # Business logic
│   ├── authService.js
│   ├── emailService.js
│   ├── notificationService.js
│   ├── reputationService.js
│   └── searchService.js
├── utils/                # Utility functions
│   ├── logger.js
│   ├── validators.js
│   ├── helpers.js
│   └── constants.js
├── database/             # Database related files
│   ├── migrations/
│   └── seeders/
├── websocket/            # WebSocket handlers
│   └── notificationHandler.js
└── server.js            # Main server file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/forgot` - Send password reset
- `POST /api/v1/auth/reset` - Reset password
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users/:id` - Get user profile
- `PATCH /api/v1/users/:id` - Update user profile
- `GET /api/v1/users/:id/stats` - Get user statistics
- `GET /api/v1/users/:id/reputation` - Get reputation history

### Spaces (Communities)
- `POST /api/v1/spaces` - Create new space
- `GET /api/v1/spaces` - List/search spaces
- `GET /api/v1/spaces/:id` - Get space details
- `PATCH /api/v1/spaces/:id` - Update space
- `POST /api/v1/spaces/:id/join` - Join space
- `DELETE /api/v1/spaces/:id/leave` - Leave space
- `GET /api/v1/spaces/:id/feed` - Get space feed

### Posts
- `POST /api/v1/posts` - Create new post
- `GET /api/v1/posts/:id` - Get post details
- `PATCH /api/v1/posts/:id` - Update post
- `DELETE /api/v1/posts/:id` - Delete post
- `POST /api/v1/posts/:id/vote` - Vote on post
- `POST /api/v1/posts/:id/accept` - Accept answer

### Answers
- `POST /api/v1/posts/:id/answers` - Add answer
- `PATCH /api/v1/answers/:id` - Update answer
- `DELETE /api/v1/answers/:id` - Delete answer
- `POST /api/v1/answers/:id/vote` - Vote on answer

### Comments
- `POST /api/v1/posts/:id/comments` - Add comment to post
- `POST /api/v1/answers/:id/comments` - Add comment to answer
- `PATCH /api/v1/comments/:id` - Update comment
- `DELETE /api/v1/comments/:id` - Delete comment

### Search & Discovery
- `GET /api/v1/search` - Full-text search
- `GET /api/v1/trending` - Trending posts
- `GET /api/v1/tags` - Tag autocomplete
- `GET /api/v1/posts/similar` - Duplicate detection

### Moderation
- `POST /api/v1/reports` - Report content
- `GET /api/v1/mod/queue` - Moderation queue
- `POST /api/v1/mod/actions` - Moderation actions
- `GET /api/v1/audit/logs` - Audit logs

### Notifications
- `GET /api/v1/notifications` - Get notifications
- `POST /api/v1/notifications/read` - Mark as read
- `WS /ws/notify` - Real-time notifications

### Admin
- `GET /api/v1/admin/metrics` - Platform metrics
- `GET /api/v1/admin/space/:id/health` - Space health

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env` and configure:

- **Database**: MongoDB connection string
- **JWT**: Secret keys and expiration times
- **Email**: SMTP settings for notifications
- **Security**: Rate limiting and CORS settings
- **File Upload**: Path and size limits

### Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Create database: `community_qa`
3. Run migrations: `npm run migrate`
4. Seed data: `npm run seed`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- auth.test.js
```

## 📊 Monitoring & Logging

- **Winston** for structured logging
- **Morgan** for HTTP request logging
- **Health checks** for monitoring
- **Error tracking** with detailed stack traces

## 🔒 Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting on all endpoints
- CORS protection
- Helmet.js security headers
- Input validation and sanitization
- SQL injection prevention (MongoDB)
- XSS protection

## 🚀 Deployment

### Docker (Recommended)

```bash
# Build image
docker build -t community-qa-backend .

# Run container
docker run -p 3000:3000 community-qa-backend
```

### Manual Deployment

1. Set `NODE_ENV=production`
2. Configure production database
3. Set up reverse proxy (nginx)
4. Use PM2 for process management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API blueprint

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- Authentication and user management
- Community spaces and content management
- Voting and reputation systems
- Search and moderation tools
