// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'space.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Space _$SpaceFromJson(Map<String, dynamic> json) => Space(
      id: json['id'] as String,
      name: json['name'] as String,
      slug: json['slug'] as String,
      description: json['description'] as String,
      rules: json['rules'] as String?,
      icon: json['icon'] as String?,
      banner: json['banner'] as String?,
      color: json['color'] as String,
      isPublic: json['isPublic'] as bool,
      isActive: json['isActive'] as bool,
      allowQuestions: json['allowQuestions'] as bool,
      allowDiscussions: json['allowDiscussions'] as bool,
      requireApproval: json['requireApproval'] as bool,
      allowAnonymous: json['allowAnonymous'] as bool,
      memberCount: (json['memberCount'] as num).toInt(),
      postCount: (json['postCount'] as num).toInt(),
      questionCount: (json['questionCount'] as num).toInt(),
      discussionCount: (json['discussionCount'] as num).toInt(),
      defaultTags: (json['defaultTags'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      owner: json['owner'] as String,
      moderators: (json['moderators'] as List<dynamic>?)
          ?.map((e) => SpaceModerator.fromJson(e as Map<String, dynamic>))
          .toList(),
      categories: (json['categories'] as List<dynamic>?)
          ?.map((e) => SpaceCategory.fromJson(e as Map<String, dynamic>))
          .toList(),
      stats: json['stats'] == null
          ? null
          : SpaceStats.fromJson(json['stats'] as Map<String, dynamic>),
      lastActivity: json['lastActivity'] == null
          ? null
          : DateTime.parse(json['lastActivity'] as String),
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$SpaceToJson(Space instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'slug': instance.slug,
      'description': instance.description,
      'rules': instance.rules,
      'icon': instance.icon,
      'banner': instance.banner,
      'color': instance.color,
      'isPublic': instance.isPublic,
      'isActive': instance.isActive,
      'allowQuestions': instance.allowQuestions,
      'allowDiscussions': instance.allowDiscussions,
      'requireApproval': instance.requireApproval,
      'allowAnonymous': instance.allowAnonymous,
      'memberCount': instance.memberCount,
      'postCount': instance.postCount,
      'questionCount': instance.questionCount,
      'discussionCount': instance.discussionCount,
      'defaultTags': instance.defaultTags,
      'owner': instance.owner,
      'moderators': instance.moderators,
      'categories': instance.categories,
      'stats': instance.stats,
      'lastActivity': instance.lastActivity?.toIso8601String(),
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
    };

SpaceModerator _$SpaceModeratorFromJson(Map<String, dynamic> json) =>
    SpaceModerator(
      user: json['user'] as String,
      addedBy: json['addedBy'] as String,
      addedAt: DateTime.parse(json['addedAt'] as String),
    );

Map<String, dynamic> _$SpaceModeratorToJson(SpaceModerator instance) =>
    <String, dynamic>{
      'user': instance.user,
      'addedBy': instance.addedBy,
      'addedAt': instance.addedAt.toIso8601String(),
    };

SpaceCategory _$SpaceCategoryFromJson(Map<String, dynamic> json) =>
    SpaceCategory(
      name: json['name'] as String,
      description: json['description'] as String?,
      color: json['color'] as String,
      order: (json['order'] as num).toInt(),
    );

Map<String, dynamic> _$SpaceCategoryToJson(SpaceCategory instance) =>
    <String, dynamic>{
      'name': instance.name,
      'description': instance.description,
      'color': instance.color,
      'order': instance.order,
    };

SpaceStats _$SpaceStatsFromJson(Map<String, dynamic> json) => SpaceStats(
      totalViews: (json['totalViews'] as num).toInt(),
      totalVotes: (json['totalVotes'] as num).toInt(),
      averageResponseTime: (json['averageResponseTime'] as num).toDouble(),
      unansweredQuestions: (json['unansweredQuestions'] as num).toInt(),
    );

Map<String, dynamic> _$SpaceStatsToJson(SpaceStats instance) =>
    <String, dynamic>{
      'totalViews': instance.totalViews,
      'totalVotes': instance.totalVotes,
      'averageResponseTime': instance.averageResponseTime,
      'unansweredQuestions': instance.unansweredQuestions,
    };
