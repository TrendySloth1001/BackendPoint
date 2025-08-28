import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';
import 'api_client.dart';

class AuthService {
  final ApiClient _apiClient;

  AuthService(this._apiClient);

  // Sign up
  Future<Map<String, dynamic>> signUp({
    required String email,
    required String password,
    required String displayName,
    required String username,
  }) async {
    try {
      final response = await _apiClient.post('/auth/signup', data: {
        'email': email,
        'password': password,
        'displayName': displayName,
        'username': username,
      });

      if (response.statusCode == 201) {
        final data = response.data['data'];
        final tokens = data['tokens'];
        
        // Store tokens
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('access_token', tokens['accessToken']);
        await prefs.setString('refresh_token', tokens['refreshToken']);
        
        return {
          'success': true,
          'user': User.fromJson(data['user']),
          'message': response.data['message'],
        };
      }
      
      return {
        'success': false,
        'message': response.data['message'] ?? 'Sign up failed',
      };
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: ${e.toString()}',
      };
    }
  }

  // Login
  Future<Map<String, dynamic>> login({
    required String identifier,
    required String password,
  }) async {
    try {
      final response = await _apiClient.post('/auth/login', data: {
        'identifier': identifier,
        'password': password,
      });

      if (response.statusCode == 200) {
        final data = response.data['data'];
        final tokens = data['tokens'];
        
        // Store tokens
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('access_token', tokens['accessToken']);
        await prefs.setString('refresh_token', tokens['refreshToken']);
        
        return {
          'success': true,
          'user': User.fromJson(data['user']),
          'message': response.data['message'],
        };
      }
      
      return {
        'success': false,
        'message': response.data['message'] ?? 'Login failed',
      };
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: ${e.toString()}',
      };
    }
  }

  // Get current user
  Future<Map<String, dynamic>> getCurrentUser() async {
    try {
      final response = await _apiClient.get('/auth/me');

      if (response.statusCode == 200) {
        return {
          'success': true,
          'user': User.fromJson(response.data['data']['user']),
        };
      }
      
      return {
        'success': false,
        'message': 'Failed to get user data',
      };
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: ${e.toString()}',
      };
    }
  }

  // Logout
  Future<void> logout() async {
    try {
      await _apiClient.post('/auth/logout');
    } catch (e) {
      // Ignore logout errors
    } finally {
      // Clear tokens regardless of API call success
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('access_token');
      await prefs.remove('refresh_token');
    }
  }

  // Forgot password
  Future<Map<String, dynamic>> forgotPassword(String email) async {
    try {
      final response = await _apiClient.post('/auth/forgot', data: {
        'email': email,
      });

      return {
        'success': response.statusCode == 200,
        'message': response.data['message'],
      };
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: ${e.toString()}',
      };
    }
  }

  // Reset password
  Future<Map<String, dynamic>> resetPassword({
    required String token,
    required String newPassword,
  }) async {
    try {
      final response = await _apiClient.post('/auth/reset', data: {
        'token': token,
        'newPassword': newPassword,
      });

      return {
        'success': response.statusCode == 200,
        'message': response.data['message'],
      };
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: ${e.toString()}',
      };
    }
  }

  // Verify email
  Future<Map<String, dynamic>> verifyEmail(String token) async {
    try {
      final response = await _apiClient.post('/auth/verify-email', data: {
        'token': token,
      });

      return {
        'success': response.statusCode == 200,
        'message': response.data['message'],
      };
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: ${e.toString()}',
      };
    }
  }

  // Resend verification email
  Future<Map<String, dynamic>> resendVerification(String email) async {
    try {
      final response = await _apiClient.post('/auth/resend-verification', data: {
        'email': email,
      });

      return {
        'success': response.statusCode == 200,
        'message': response.data['message'],
      };
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: ${e.toString()}',
      };
    }
  }

  // Check if user is logged in
  Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('access_token');
    return token != null;
  }

  // Get stored tokens
  Future<Map<String, String?>> getTokens() async {
    final prefs = await SharedPreferences.getInstance();
    return {
      'access_token': prefs.getString('access_token'),
      'refresh_token': prefs.getString('refresh_token'),
    };
  }
}
