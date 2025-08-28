import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiClient {
  static const String baseUrl = 'https://9qmpzklg-3000.inc1.devtunnels.ms/api/v1';
  late Dio _dio;

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      validateStatus: (status) => status != null && status < 500,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('access_token');

        if (token != null && token.isNotEmpty) {
          options.headers['Authorization'] = 'Bearer $token';
        }

        handler.next(options);
      },
      onError: (error, handler) async {
        if (error.response?.statusCode == 401) {
          final prefs = await SharedPreferences.getInstance();
          final refreshToken = prefs.getString('refresh_token');
          
          if (refreshToken != null && refreshToken.isNotEmpty) {
            try {
              final response = await _dio.post('/auth/refresh', data: {
                'refreshToken': refreshToken,
              });

              if (response.statusCode == 200) {
                final newToken = response.data['data']['tokens']['accessToken'];
                await prefs.setString('access_token', newToken);

                // Retry with new token
                final reqOptions = error.requestOptions;
                reqOptions.headers['Authorization'] = 'Bearer $newToken';

                final retryResponse = await _dio.fetch(reqOptions);
                handler.resolve(retryResponse);
                return;
              }
            } catch (_) {
              await prefs.remove('access_token');
              await prefs.remove('refresh_token');
            }
          }
        }
        handler.next(error);
      },
    ));
  }

  Dio get dio => _dio;

  Future<Response> get(String path, {Map<String, dynamic>? queryParameters}) {
    return _dio.get(path, queryParameters: queryParameters);
  }

  Future<Response> post(String path, {dynamic data}) {
    return _dio.post(path, data: data);
  }

  Future<Response> put(String path, {dynamic data}) {
    return _dio.put(path, data: data);
  }

  Future<Response> patch(String path, {dynamic data}) {
    return _dio.patch(path, data: data);
  }

  Future<Response> delete(String path) {
    return _dio.delete(path);
  }
}