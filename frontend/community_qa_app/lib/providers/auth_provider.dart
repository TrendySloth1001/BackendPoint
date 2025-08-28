import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/user.dart';
import '../services/auth_service.dart';
import '../services/api_client.dart';

// Auth state
class AuthState {
  final User? user;
  final bool isLoading;
  final String? error;
  final bool isAuthenticated;

  AuthState({
    this.user,
    this.isLoading = false,
    this.error,
    this.isAuthenticated = false,
  });

  AuthState copyWith({
    User? user,
    bool? isLoading,
    String? error,
    bool? isAuthenticated,
  }) {
    return AuthState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
    );
  }
}

// Auth notifier
class AuthNotifier extends StateNotifier<AuthState> {
  final AuthService _authService;

  AuthNotifier(this._authService) : super(AuthState());

  // Initialize auth state
  Future<void> initialize() async {
    state = state.copyWith(isLoading: true);
    
    try {
      final isLoggedIn = await _authService.isLoggedIn();
      if (isLoggedIn) {
        final result = await _authService.getCurrentUser();
        if (result['success']) {
          state = state.copyWith(
            user: result['user'],
            isAuthenticated: true,
            isLoading: false,
          );
        } else {
          state = state.copyWith(
            isAuthenticated: false,
            isLoading: false,
            error: result['message'],
          );
        }
      } else {
        state = state.copyWith(
          isAuthenticated: false,
          isLoading: false,
        );
      }
    } catch (e) {
      state = state.copyWith(
        isAuthenticated: false,
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  // Sign up
  Future<bool> signUp({
    required String email,
    required String password,
    required String displayName,
    required String username,
  }) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final result = await _authService.signUp(
        email: email,
        password: password,
        displayName: displayName,
        username: username,
      );

      if (result['success']) {
        state = state.copyWith(
          user: result['user'],
          isAuthenticated: true,
          isLoading: false,
        );
        return true;
      } else {
        state = state.copyWith(
          isLoading: false,
          error: result['message'],
        );
        return false;
      }
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }

  // Login
  Future<bool> login({
    required String identifier,
    required String password,
  }) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final result = await _authService.login(
        identifier: identifier,
        password: password,
      );

      if (result['success']) {
        state = state.copyWith(
          user: result['user'],
          isAuthenticated: true,
          isLoading: false,
        );
        return true;
      } else {
        state = state.copyWith(
          isLoading: false,
          error: result['message'],
        );
        return false;
      }
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }

  // Logout
  Future<void> logout() async {
    state = state.copyWith(isLoading: true);
    
    try {
      await _authService.logout();
      state = AuthState();
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  // Forgot password
  Future<bool> forgotPassword(String email) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final result = await _authService.forgotPassword(email);
      
      state = state.copyWith(isLoading: false);
      
      if (!result['success']) {
        state = state.copyWith(error: result['message']);
      }
      
      return result['success'];
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }

  // Reset password
  Future<bool> resetPassword({
    required String token,
    required String newPassword,
  }) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final result = await _authService.resetPassword(
        token: token,
        newPassword: newPassword,
      );
      
      state = state.copyWith(isLoading: false);
      
      if (!result['success']) {
        state = state.copyWith(error: result['message']);
      }
      
      return result['success'];
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }

  // Verify email
  Future<bool> verifyEmail(String token) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final result = await _authService.verifyEmail(token);
      
      state = state.copyWith(isLoading: false);
      
      if (!result['success']) {
        state = state.copyWith(error: result['message']);
      }
      
      return result['success'];
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }

  // Resend verification
  Future<bool> resendVerification(String email) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final result = await _authService.resendVerification(email);
      
      state = state.copyWith(isLoading: false);
      
      if (!result['success']) {
        state = state.copyWith(error: result['message']);
      }
      
      return result['success'];
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
      return false;
    }
  }

  // Update user
  void updateUser(User user) {
    state = state.copyWith(user: user);
  }

  // Clear error
  void clearError() {
    state = state.copyWith(error: null);
  }
}

// Providers
final apiClientProvider = Provider<ApiClient>((ref) {
  return ApiClient();
});

final authServiceProvider = Provider<AuthService>((ref) {
  final apiClient = ref.watch(apiClientProvider);
  return AuthService(apiClient);
});

final authNotifierProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final authService = ref.watch(authServiceProvider);
  return AuthNotifier(authService);
});

final userProvider = Provider<User?>((ref) {
  return ref.watch(authNotifierProvider).user;
});

final isAuthenticatedProvider = Provider<bool>((ref) {
  return ref.watch(authNotifierProvider).isAuthenticated;
});

final isLoadingProvider = Provider<bool>((ref) {
  return ref.watch(authNotifierProvider).isLoading;
});

final authErrorProvider = Provider<String?>((ref) {
  return ref.watch(authNotifierProvider).error;
});
