import 'package:flutter/material.dart';

class AppColors {
  static const Color primary = Color(0xFF2563EB);
  static const Color secondary = Color(0xFF64748B);
  static const Color accent = Color(0xFFF59E0B);
  static const Color success = Color(0xFF10B981);
  static const Color error = Color(0xFFEF4444);
  static const Color warning = Color(0xFFF59E0B);
  static const Color info = Color(0xFF3B82F6);
  
  static const Color background = Color(0xFFF8FAFC);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceVariant = Color(0xFFF1F5F9);
  
  static const Color textPrimary = Color(0xFF1E293B);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color textTertiary = Color(0xFF94A3B8);
  
  static const Color border = Color(0xFFE2E8F0);
  static const Color divider = Color(0xFFF1F5F9);
}

class AppSizes {
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0;
  
  static const double borderRadius = 8.0;
  static const double borderRadiusLg = 12.0;
  static const double borderRadiusXl = 16.0;
  
  static const double iconSize = 24.0;
  static const double iconSizeSm = 20.0;
  static const double iconSizeLg = 32.0;
}

class AppStrings {
  // App
  static const String appName = 'Community Q&A';
  static const String appDescription = 'A community-driven Q&A platform';
  
  // Auth
  static const String login = 'Login';
  static const String signup = 'Sign Up';
  static const String logout = 'Logout';
  static const String email = 'Email';
  static const String password = 'Password';
  static const String confirmPassword = 'Confirm Password';
  static const String displayName = 'Display Name';
  static const String username = 'Username';
  static const String forgotPassword = 'Forgot Password?';
  static const String resetPassword = 'Reset Password';
  static const String verifyEmail = 'Verify Email';
  static const String resendVerification = 'Resend Verification';
  
  // Validation
  static const String emailRequired = 'Email is required';
  static const String emailInvalid = 'Please enter a valid email';
  static const String passwordRequired = 'Password is required';
  static const String passwordMinLength = 'Password must be at least 8 characters';
  static const String passwordMismatch = 'Passwords do not match';
  static const String displayNameRequired = 'Display name is required';
  static const String usernameRequired = 'Username is required';
  static const String usernameMinLength = 'Username must be at least 3 characters';
  static const String usernameInvalid = 'Username can only contain letters, numbers, underscores, and hyphens';
  
  // Errors
  static const String networkError = 'Network error occurred';
  static const String unknownError = 'An unknown error occurred';
  static const String loginFailed = 'Login failed';
  static const String signupFailed = 'Sign up failed';
  static const String invalidCredentials = 'Invalid credentials';
  static const String emailAlreadyExists = 'Email already exists';
  static const String usernameAlreadyExists = 'Username already exists';
  
  // Success
  static const String loginSuccess = 'Login successful';
  static const String signupSuccess = 'Account created successfully';
  static const String logoutSuccess = 'Logged out successfully';
  static const String passwordResetSent = 'Password reset email sent';
  static const String passwordResetSuccess = 'Password reset successfully';
  static const String emailVerificationSent = 'Verification email sent';
  static const String emailVerified = 'Email verified successfully';
  
  // Navigation
  static const String home = 'Home';
  static const String profile = 'Profile';
  static const String settings = 'Settings';
  static const String search = 'Search';
  static const String notifications = 'Notifications';
  static const String spaces = 'Spaces';
  static const String questions = 'Questions';
  static const String discussions = 'Discussions';
  
  // Actions
  static const String askQuestion = 'Ask Question';
  static const String startDiscussion = 'Start Discussion';
  static const String answer = 'Answer';
  static const String comment = 'Comment';
  static const String vote = 'Vote';
  static const String accept = 'Accept';
  static const String edit = 'Edit';
  static const String delete = 'Delete';
  static const String report = 'Report';
  static const String share = 'Share';
  static const String bookmark = 'Bookmark';
  static const String follow = 'Follow';
  static const String unfollow = 'Unfollow';
  static const String join = 'Join';
  static const String leave = 'Leave';
  
  // Placeholders
  static const String searchPlaceholder = 'Search questions, discussions, or users...';
  static const String questionTitlePlaceholder = 'What\'s your question?';
  static const String questionBodyPlaceholder = 'Provide more details about your question...';
  static const String discussionTitlePlaceholder = 'What would you like to discuss?';
  static const String discussionBodyPlaceholder = 'Share your thoughts...';
  static const String answerPlaceholder = 'Write your answer...';
  static const String commentPlaceholder = 'Add a comment...';
  static const String bioPlaceholder = 'Tell us about yourself...';
  
  // Messages
  static const String noQuestionsYet = 'No questions yet';
  static const String noDiscussionsYet = 'No discussions yet';
  static const String noAnswersYet = 'No answers yet';
  static const String noCommentsYet = 'No comments yet';
  static const String noSpacesYet = 'No spaces yet';
  static const String noUsersFound = 'No users found';
  static const String noResultsFound = 'No results found';
  static const String loading = 'Loading...';
  static const String retry = 'Retry';
  static const String cancel = 'Cancel';
  static const String save = 'Save';
  static const String submit = 'Submit';
  static const String confirm = 'Confirm';
  static const String yes = 'Yes';
  static const String no = 'No';
  static const String ok = 'OK';
}

class AppRoutes {
  static const String splash = '/';
  static const String login = '/login';
  static const String signup = '/signup';
  static const String home = '/home';
  static const String profile = '/profile';
  static const String settings = '/settings';
  static const String search = '/search';
  static const String notifications = '/notifications';
  static const String spaces = '/spaces';
  static const String space = '/space';
  static const String questions = '/questions';
  static const String question = '/question';
  static const String discussions = '/discussions';
  static const String discussion = '/discussion';
  static const String askQuestion = '/ask-question';
  static const String startDiscussion = '/start-discussion';
}

class ApiEndpoints {
  static const String baseUrl = 'http://localhost:3000/api/v1';
  
  // Auth
  static const String signup = '/auth/signup';
  static const String login = '/auth/login';
  static const String logout = '/auth/logout';
  static const String refresh = '/auth/refresh';
  static const String me = '/auth/me';
  static const String forgotPassword = '/auth/forgot';
  static const String resetPassword = '/auth/reset';
  static const String verifyEmail = '/auth/verify-email';
  static const String resendVerification = '/auth/resend-verification';
  
  // Users
  static const String users = '/users';
  static const String userProfile = '/users/:id';
  static const String userStats = '/users/:id/stats';
  static const String userReputation = '/users/:id/reputation';
  
  // Spaces
  static const String spaces = '/spaces';
  static const String spaceDetail = '/spaces/:id';
  static const String joinSpace = '/spaces/:id/join';
  static const String leaveSpace = '/spaces/:id/leave';
  static const String spaceFeed = '/spaces/:id/feed';
  
  // Posts
  static const String posts = '/posts';
  static const String postDetail = '/posts/:id';
  static const String votePost = '/posts/:id/vote';
  static const String acceptAnswer = '/posts/:id/accept';
  
  // Answers
  static const String answers = '/answers';
  static const String answerDetail = '/answers/:id';
  static const String voteAnswer = '/answers/:id/vote';
  
  // Comments
  static const String comments = '/comments';
  static const String commentDetail = '/comments/:id';
  
  // Search
  static const String search = '/search';
  static const String trending = '/search/trending';
  static const String tags = '/search/tags';
  static const String similarPosts = '/search/posts/similar';
  
  // Moderation
  static const String reports = '/mod/reports';
  static const String moderationQueue = '/mod/queue';
  static const String moderationActions = '/mod/actions';
  static const String auditLogs = '/mod/audit/logs';
  
  // Notifications
  static const String notifications = '/notifications';
  static const String markAsRead = '/notifications/read';
  
  // Admin
  static const String metrics = '/admin/metrics';
  static const String spaceHealth = '/admin/space/:id/health';
}
