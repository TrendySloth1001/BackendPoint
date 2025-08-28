// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) => User(
      id: json['id'] as String,
      email: json['email'] as String,
      displayName: json['displayName'] as String,
      username: json['username'] as String,
      bio: json['bio'] as String?,
      avatar: json['avatar'] as String?,
      website: json['website'] as String?,
      location: json['location'] as String?,
      isEmailVerified: json['isEmailVerified'] as bool? ?? false,
      isActive: json['isActive'] as bool? ?? false,
      reputation: (json['reputation'] as num).toInt(),
      role: json['role'] as String,
      permissions: (json['permissions'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      stats: json['stats'] == null
          ? null
          : UserStats.fromJson(json['stats'] as Map<String, dynamic>),
      badges: (json['badges'] as List<dynamic>?)
          ?.map((e) => Badge.fromJson(e as Map<String, dynamic>))
          .toList(),
      preferences: json['preferences'] == null
          ? null
          : UserPreferences.fromJson(
              json['preferences'] as Map<String, dynamic>),
      spaces: (json['spaces'] as List<dynamic>?)
          ?.map((e) => SpaceMembership.fromJson(e as Map<String, dynamic>))
          .toList(),
      following: (json['following'] as List<dynamic>?)
          ?.map((e) => User.fromJson(e as Map<String, dynamic>))
          .toList(),
      followers: (json['followers'] as List<dynamic>?)
          ?.map((e) => User.fromJson(e as Map<String, dynamic>))
          .toList(),
      lastSeen: json['lastSeen'] == null
          ? null
          : DateTime.parse(json['lastSeen'] as String),
      lastActivity: json['lastActivity'] == null
          ? null
          : DateTime.parse(json['lastActivity'] as String),
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'id': instance.id,
      'email': instance.email,
      'displayName': instance.displayName,
      'username': instance.username,
      'bio': instance.bio,
      'avatar': instance.avatar,
      'website': instance.website,
      'location': instance.location,
      'isEmailVerified': instance.isEmailVerified,
      'isActive': instance.isActive,
      'reputation': instance.reputation,
      'role': instance.role,
      'permissions': instance.permissions,
      'stats': instance.stats,
      'badges': instance.badges,
      'preferences': instance.preferences,
      'spaces': instance.spaces,
      'following': instance.following,
      'followers': instance.followers,
      'lastSeen': instance.lastSeen?.toIso8601String(),
      'lastActivity': instance.lastActivity?.toIso8601String(),
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
    };

UserStats _$UserStatsFromJson(Map<String, dynamic> json) => UserStats(
      questionsAsked: (json['questionsAsked'] as num).toInt(),
      answersGiven: (json['answersGiven'] as num).toInt(),
      answersAccepted: (json['answersAccepted'] as num).toInt(),
      commentsMade: (json['commentsMade'] as num).toInt(),
      totalVotes: (json['totalVotes'] as num).toInt(),
      upvotesReceived: (json['upvotesReceived'] as num).toInt(),
      downvotesReceived: (json['downvotesReceived'] as num).toInt(),
    );

Map<String, dynamic> _$UserStatsToJson(UserStats instance) => <String, dynamic>{
      'questionsAsked': instance.questionsAsked,
      'answersGiven': instance.answersGiven,
      'answersAccepted': instance.answersAccepted,
      'commentsMade': instance.commentsMade,
      'totalVotes': instance.totalVotes,
      'upvotesReceived': instance.upvotesReceived,
      'downvotesReceived': instance.downvotesReceived,
    };

Badge _$BadgeFromJson(Map<String, dynamic> json) => Badge(
      type: json['type'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
      awardedAt: DateTime.parse(json['awardedAt'] as String),
    );

Map<String, dynamic> _$BadgeToJson(Badge instance) => <String, dynamic>{
      'type': instance.type,
      'name': instance.name,
      'description': instance.description,
      'awardedAt': instance.awardedAt.toIso8601String(),
    };

UserPreferences _$UserPreferencesFromJson(Map<String, dynamic> json) =>
    UserPreferences(
      emailNotifications: json['emailNotifications'] as bool? ?? false,
      pushNotifications: json['pushNotifications'] as bool? ?? false,
      publicProfile: json['publicProfile'] as bool? ?? false,
      showEmail: json['showEmail'] as bool? ?? false,
    );

Map<String, dynamic> _$UserPreferencesToJson(UserPreferences instance) =>
    <String, dynamic>{
      'emailNotifications': instance.emailNotifications,
      'pushNotifications': instance.pushNotifications,
      'publicProfile': instance.publicProfile,
      'showEmail': instance.showEmail,
    };

SpaceMembership _$SpaceMembershipFromJson(Map<String, dynamic> json) =>
    SpaceMembership(
      space: json['space'] as String,
      role: json['role'] as String,
      joinedAt: DateTime.parse(json['joinedAt'] as String),
    );

Map<String, dynamic> _$SpaceMembershipToJson(SpaceMembership instance) =>
    <String, dynamic>{
      'space': instance.space,
      'role': instance.role,
      'joinedAt': instance.joinedAt.toIso8601String(),
    };
