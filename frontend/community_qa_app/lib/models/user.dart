import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  final String id;
  final String email;
  final String displayName;
  final String username;
  final String? bio;
  final String? avatar;
  final String? website;
  final String? location;
  final bool isEmailVerified;
  final bool isActive;
  final int reputation;
  final String role;
  final List<String>? permissions;
  final UserStats? stats;
  final List<Badge>? badges;
  final UserPreferences? preferences;
  final List<SpaceMembership>? spaces;
  final List<User>? following;
  final List<User>? followers;
  final DateTime? lastSeen;
  final DateTime? lastActivity;
  final DateTime createdAt;
  final DateTime updatedAt;

  User({
    required this.id,
    required this.email,
    required this.displayName,
    required this.username,
    this.bio,
    this.avatar,
    this.website,
    this.location,
    required this.isEmailVerified,
    required this.isActive,
    required this.reputation,
    required this.role,
    this.permissions,
    this.stats,
    this.badges,
    this.preferences,
    this.spaces,
    this.following,
    this.followers,
    this.lastSeen,
    this.lastActivity,
    required this.createdAt,
    required this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);

  String get avatarUrl {
    if (avatar != null && avatar!.isNotEmpty) {
      if (avatar!.startsWith('http')) {
        return avatar!;
      }
      return 'http://localhost:3000/uploads/avatars/$avatar';
    }
    return 'https://ui-avatars.com/api/?name=${Uri.encodeComponent(displayName)}&size=200&background=random';
  }

  User copyWith({
    String? id,
    String? email,
    String? displayName,
    String? username,
    String? bio,
    String? avatar,
    String? website,
    String? location,
    bool? isEmailVerified,
    bool? isActive,
    int? reputation,
    String? role,
    List<String>? permissions,
    UserStats? stats,
    List<Badge>? badges,
    UserPreferences? preferences,
    List<SpaceMembership>? spaces,
    List<User>? following,
    List<User>? followers,
    DateTime? lastSeen,
    DateTime? lastActivity,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return User(
      id: id ?? this.id,
      email: email ?? this.email,
      displayName: displayName ?? this.displayName,
      username: username ?? this.username,
      bio: bio ?? this.bio,
      avatar: avatar ?? this.avatar,
      website: website ?? this.website,
      location: location ?? this.location,
      isEmailVerified: isEmailVerified ?? this.isEmailVerified,
      isActive: isActive ?? this.isActive,
      reputation: reputation ?? this.reputation,
      role: role ?? this.role,
      permissions: permissions ?? this.permissions,
      stats: stats ?? this.stats,
      badges: badges ?? this.badges,
      preferences: preferences ?? this.preferences,
      spaces: spaces ?? this.spaces,
      following: following ?? this.following,
      followers: followers ?? this.followers,
      lastSeen: lastSeen ?? this.lastSeen,
      lastActivity: lastActivity ?? this.lastActivity,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}

@JsonSerializable()
class UserStats {
  final int questionsAsked;
  final int answersGiven;
  final int answersAccepted;
  final int commentsMade;
  final int totalVotes;
  final int upvotesReceived;
  final int downvotesReceived;

  UserStats({
    required this.questionsAsked,
    required this.answersGiven,
    required this.answersAccepted,
    required this.commentsMade,
    required this.totalVotes,
    required this.upvotesReceived,
    required this.downvotesReceived,
  });

  factory UserStats.fromJson(Map<String, dynamic> json) => _$UserStatsFromJson(json);
  Map<String, dynamic> toJson() => _$UserStatsToJson(this);
}

@JsonSerializable()
class Badge {
  final String type;
  final String name;
  final String description;
  final DateTime awardedAt;

  Badge({
    required this.type,
    required this.name,
    required this.description,
    required this.awardedAt,
  });

  factory Badge.fromJson(Map<String, dynamic> json) => _$BadgeFromJson(json);
  Map<String, dynamic> toJson() => _$BadgeToJson(this);
}

@JsonSerializable()
class UserPreferences {
  final bool emailNotifications;
  final bool pushNotifications;
  final bool publicProfile;
  final bool showEmail;

  UserPreferences({
    required this.emailNotifications,
    required this.pushNotifications,
    required this.publicProfile,
    required this.showEmail,
  });

  factory UserPreferences.fromJson(Map<String, dynamic> json) => _$UserPreferencesFromJson(json);
  Map<String, dynamic> toJson() => _$UserPreferencesToJson(this);
}

@JsonSerializable()
class SpaceMembership {
  final String space;
  final String role;
  final DateTime joinedAt;

  SpaceMembership({
    required this.space,
    required this.role,
    required this.joinedAt,
  });

  factory SpaceMembership.fromJson(Map<String, dynamic> json) => _$SpaceMembershipFromJson(json);
  Map<String, dynamic> toJson() => _$SpaceMembershipToJson(this);
}
