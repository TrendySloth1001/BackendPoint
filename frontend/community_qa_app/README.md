# Community Q&A Flutter App

A modern Flutter application for the Community Q&A platform, built with clean architecture, state management, and comprehensive API integration.

## 🚀 Features

### ✅ Implemented
- **Authentication System**
  - User registration and login
  - JWT token management with automatic refresh
  - Email verification
  - Password reset functionality
  - Secure token storage

- **Modern UI/UX**
  - Material Design 3 with custom theming
  - Responsive design for different screen sizes
  - Custom widgets for consistent UI
  - Loading states and error handling
  - Form validation

- **State Management**
  - Riverpod for reactive state management
  - Provider pattern for dependency injection
  - Centralized auth state management

- **Navigation**
  - GoRouter for declarative routing
  - Deep linking support
  - Route guards for authentication

### 🚧 In Progress / Planned
- **Core Features**
  - Question and answer management
  - Discussion threads
  - Community spaces
  - User profiles and reputation system
  - Search functionality
  - Real-time notifications

- **Advanced Features**
  - File uploads and media support
  - Markdown rendering
  - Offline support
  - Push notifications
  - Analytics and reporting

## 📱 Screenshots

*Screenshots will be added as the app develops*

## 🛠️ Tech Stack

### Core Framework
- **Flutter** - UI framework
- **Dart** - Programming language

### State Management
- **Riverpod** - State management and dependency injection
- **flutter_riverpod** - Flutter integration

### Networking & API
- **Dio** - HTTP client
- **Retrofit** - Type-safe HTTP client
- **json_annotation** - JSON serialization

### Navigation
- **go_router** - Declarative routing

### Local Storage
- **SharedPreferences** - Simple key-value storage
- **Hive** - NoSQL database

### UI Components
- **flutter_svg** - SVG support
- **cached_network_image** - Image caching
- **shimmer** - Loading animations
- **pull_to_refresh** - Pull-to-refresh functionality

### Development Tools
- **build_runner** - Code generation
- **json_serializable** - JSON code generation
- **retrofit_generator** - API client generation
- **hive_generator** - Database code generation

## 📁 Project Structure

```
lib/
├── constants/           # App constants and configurations
│   └── constants.dart
├── models/             # Data models
│   ├── user.dart
│   ├── space.dart
│   ├── post.dart
│   └── answer.dart
├── providers/          # State management
│   └── auth_provider.dart
├── screens/            # UI screens
│   ├── auth/
│   │   ├── login_screen.dart
│   │   └── signup_screen.dart
│   ├── home/
│   │   └── home_screen.dart
│   └── splash_screen.dart
├── services/           # Business logic and API calls
│   ├── api_client.dart
│   └── auth_service.dart
├── utils/              # Utility functions
│   └── constants.dart
├── widgets/            # Reusable UI components
│   ├── custom_button.dart
│   └── custom_text_field.dart
└── main.dart           # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Flutter SDK (3.2.3 or higher)
- Dart SDK (3.0.0 or higher)
- Android Studio / VS Code
- Backend API running (see backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend/community_qa_app
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Generate code**
   ```bash
   flutter packages pub run build_runner build
   ```

4. **Configure API endpoint**
   - Update `lib/utils/constants.dart` with your backend URL
   - Default: `http://localhost:3000/api/v1`

5. **Run the app**
   ```bash
   flutter run
   ```

### Development

#### Code Generation
When you modify models or services, regenerate the code:
```bash
flutter packages pub run build_runner build --delete-conflicting-outputs
```

#### Hot Reload
For development with hot reload:
```bash
flutter run --hot
```

## 🔧 Configuration

### Environment Variables
The app uses the following configuration:

- **API Base URL**: Configured in `lib/utils/constants.dart`
- **Theme Colors**: Customizable in `lib/utils/constants.dart`
- **App Strings**: Centralized in `lib/utils/constants.dart`

### API Integration
The app integrates with the backend API through:

- **AuthService**: Handles authentication operations
- **ApiClient**: Manages HTTP requests and token refresh
- **Models**: Type-safe data structures for API responses

## 📱 Platform Support

- ✅ Android (API 21+)
- ✅ iOS (12.0+)
- 🚧 Web (in development)
- 🚧 Desktop (planned)

## 🧪 Testing

### Unit Tests
```bash
flutter test
```

### Widget Tests
```bash
flutter test test/widget_test.dart
```

### Integration Tests
```bash
flutter test integration_test/
```

## 📦 Building for Production

### Android
```bash
flutter build apk --release
```

### iOS
```bash
flutter build ios --release
```

## 🔒 Security

- JWT tokens stored securely using SharedPreferences
- Automatic token refresh on expiration
- Input validation and sanitization
- HTTPS enforcement for API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Backend Integration

This Flutter app is designed to work with the Node.js backend. Ensure the backend is running and accessible before testing the app.

For backend setup, see the [Backend README](../../README.md).

## 📈 Roadmap

### Phase 1: Core Features ✅
- [x] Authentication system
- [x] Basic UI components
- [x] Navigation structure
- [x] API integration

### Phase 2: Content Management 🚧
- [ ] Question creation and management
- [ ] Answer system
- [ ] Discussion threads
- [ ] Community spaces

### Phase 3: Social Features 📋
- [ ] User profiles
- [ ] Reputation system
- [ ] Following/followers
- [ ] Notifications

### Phase 4: Advanced Features 📋
- [ ] Search functionality
- [ ] File uploads
- [ ] Offline support
- [ ] Push notifications

### Phase 5: Polish & Optimization 📋
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Advanced theming
- [ ] Analytics integration
