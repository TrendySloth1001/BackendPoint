# Community Q&A Platform - Frontend

This directory contains the Flutter mobile application for the Community Q&A platform.

## 🎯 Overview

The Flutter app provides a modern, responsive mobile interface for the Community Q&A platform, featuring:

- **Complete Authentication System** with JWT token management
- **Modern Material Design 3** UI with custom theming
- **State Management** using Riverpod
- **Type-safe API Integration** with comprehensive models
- **Responsive Design** for various screen sizes
- **Clean Architecture** with proper separation of concerns

## 📱 App Structure

```
frontend/
└── community_qa_app/
    ├── lib/
    │   ├── models/           # Data models (User, Space, Post, Answer)
    │   ├── services/         # API services and business logic
    │   ├── providers/        # State management with Riverpod
    │   ├── screens/          # UI screens
    │   ├── widgets/          # Reusable UI components
    │   ├── utils/            # Utilities and constants
    │   └── main.dart         # App entry point
    ├── assets/               # Images, icons, fonts
    ├── test/                 # Unit and widget tests
    ├── pubspec.yaml          # Dependencies and configuration
    └── README.md             # Detailed app documentation
```

## 🚀 Quick Start

### Prerequisites
- Flutter SDK (3.2.3+)
- Backend API running (see main README)
- Android Studio / VS Code

### Installation
```bash
cd frontend/community_qa_app
flutter pub get
flutter packages pub run build_runner build
flutter run
```

## 🔧 Key Features Implemented

### ✅ Authentication System
- **User Registration**: Complete signup flow with validation
- **User Login**: Email/username login with password
- **JWT Token Management**: Automatic token refresh
- **Secure Storage**: Tokens stored securely
- **Email Verification**: Account verification system
- **Password Reset**: Forgot password functionality

### ✅ UI/UX Components
- **Custom Text Fields**: Consistent form inputs with validation
- **Custom Buttons**: Primary, secondary, and outlined variants
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on various screen sizes

### ✅ State Management
- **Riverpod Integration**: Modern state management
- **Auth Provider**: Centralized authentication state
- **Provider Pattern**: Dependency injection
- **Reactive UI**: Automatic UI updates on state changes

### ✅ Navigation
- **GoRouter**: Declarative routing system
- **Route Guards**: Authentication-based navigation
- **Deep Linking**: Support for deep links
- **Splash Screen**: App initialization

## 📊 API Integration

The app integrates seamlessly with the Node.js backend:

### Models Created
- **User**: Complete user profile with stats and preferences
- **Space**: Community spaces with moderation and categories
- **Post**: Questions and discussions with voting
- **Answer**: Answer system with acceptance and voting

### Services Implemented
- **ApiClient**: HTTP client with token management
- **AuthService**: Authentication operations
- **Automatic Token Refresh**: Seamless token renewal

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563EB)
- **Secondary**: Gray (#64748B)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)

### Typography
- **Font Family**: Inter
- **Consistent Sizing**: xs, sm, md, lg, xl, xxl
- **Proper Hierarchy**: Headlines, titles, body text

### Components
- **CustomTextField**: Form inputs with validation
- **CustomButton**: Primary, secondary, and icon buttons
- **Loading Indicators**: Consistent loading states
- **Error Messages**: User-friendly error display

## 🔒 Security Features

- **JWT Token Management**: Secure token handling
- **Automatic Refresh**: Seamless token renewal
- **Input Validation**: Client-side validation
- **Secure Storage**: Tokens stored securely
- **HTTPS Enforcement**: Secure API communication

## 📱 Screens Implemented

### Authentication Screens
1. **Splash Screen**: App initialization and auth check
2. **Login Screen**: User authentication
3. **Signup Screen**: User registration

### Main Screens
1. **Home Screen**: Dashboard with quick actions
2. **Profile Screen**: User profile management (planned)
3. **Search Screen**: Content discovery (planned)
4. **Notifications Screen**: User notifications (planned)

## 🛠️ Development Workflow

### Code Generation
```bash
# Generate JSON serialization code
flutter packages pub run build_runner build

# Watch for changes
flutter packages pub run build_runner watch
```

### Testing
```bash
# Run all tests
flutter test

# Run specific test file
flutter test test/auth_test.dart
```

### Building
```bash
# Debug build
flutter run --debug

# Release build
flutter build apk --release
```

## 📈 Performance Optimizations

- **Code Generation**: Efficient JSON serialization
- **Lazy Loading**: Images and content loaded on demand
- **State Management**: Efficient UI updates
- **Memory Management**: Proper disposal of controllers

## 🔄 Backend Integration Status

### ✅ Fully Integrated
- Authentication endpoints
- User management
- Token refresh system
- Error handling

### 🚧 Planned Integration
- Question/Answer CRUD operations
- Community spaces
- Search functionality
- Real-time notifications
- File uploads

## 📋 Next Steps

### Phase 2: Core Features
- [ ] Question creation and management
- [ ] Answer system implementation
- [ ] Discussion threads
- [ ] Community spaces

### Phase 3: Social Features
- [ ] User profiles
- [ ] Reputation system
- [ ] Following/followers
- [ ] Notifications

### Phase 4: Advanced Features
- [ ] Search functionality
- [ ] File uploads
- [ ] Offline support
- [ ] Push notifications

## 🐛 Troubleshooting

### Common Issues

1. **Code Generation Errors**
   ```bash
   flutter packages pub run build_runner build --delete-conflicting-outputs
   ```

2. **API Connection Issues**
   - Verify backend is running on `http://localhost:3000`
   - Check network connectivity
   - Verify API endpoints in constants

3. **Build Errors**
   ```bash
   flutter clean
   flutter pub get
   flutter packages pub run build_runner build
   ```

## 📚 Documentation

- [Flutter App README](community_qa_app/README.md) - Detailed app documentation
- [Backend README](../README.md) - Backend API documentation
- [API Blueprint](../text) - Complete API specification

## 🤝 Contributing

1. Follow the existing code structure
2. Use the established design system
3. Add proper error handling
4. Include tests for new features
5. Update documentation

## 📄 License

This project is licensed under the MIT License.
