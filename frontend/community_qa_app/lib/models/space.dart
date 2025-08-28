import 'package:json_annotation/json_annotation.dart';

part 'space.g.dart';

@JsonSerializable()
class Space {
  final String id;
  final String name;
  final String slug;
  final String description;
  final String? rules;
  final String? icon;
  final String? banner;
  final String color;
  @JsonKey(defaultValue: false)
  final bool isPublic;
  @JsonKey(defaultValue: false)
  final bool isActive;
  @JsonKey(defaultValue: false)
  final bool allowQuestions;
  @JsonKey(defaultValue: false)
  final bool allowDiscussions;
  @JsonKey(defaultValue: false)
  final bool requireApproval;
  @JsonKey(defaultValue: false)
  final bool allowAnonymous;
  final int memberCount;
  final int postCount;
  final int questionCount;
  final int discussionCount;
  final List<String>? defaultTags;
  final String owner;
  final List<SpaceModerator>? moderators;
  final List<SpaceCategory>? categories;
  final SpaceStats? stats;
  final DateTime? lastActivity;
  final DateTime createdAt;
  final DateTime updatedAt;

  Space({
    required this.id,
    required this.name,
    required this.slug,
    required this.description,
    this.rules,
    this.icon,
    this.banner,
    required this.color,
    required this.isPublic,
    required this.isActive,
    required this.allowQuestions,
    required this.allowDiscussions,
    required this.requireApproval,
    required this.allowAnonymous,
    required this.memberCount,
    required this.postCount,
    required this.questionCount,
    required this.discussionCount,
    this.defaultTags,
    required this.owner,
    this.moderators,
    this.categories,
    this.stats,
    this.lastActivity,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Space.fromJson(Map<String, dynamic> json) => _$SpaceFromJson(json);
  Map<String, dynamic> toJson() => _$SpaceToJson(this);

  String get iconUrl {
    if (icon != null && icon!.isNotEmpty) {
      if (icon!.startsWith('http')) {
        return icon!;
      }
      return 'http://localhost:3000/uploads/spaces/icons/$icon';
    }
    return '';
  }

  String get bannerUrl {
    if (banner != null && banner!.isNotEmpty) {
      if (banner!.startsWith('http')) {
        return banner!;
      }
      return 'http://localhost:3000/uploads/spaces/banners/$banner';
    }
    return '';
  }

  Space copyWith({
    String? id,
    String? name,
    String? slug,
    String? description,
    String? rules,
    String? icon,
    String? banner,
    String? color,
    bool? isPublic,
    bool? isActive,
    bool? allowQuestions,
    bool? allowDiscussions,
    bool? requireApproval,
    bool? allowAnonymous,
    int? memberCount,
    int? postCount,
    int? questionCount,
    int? discussionCount,
    List<String>? defaultTags,
    String? owner,
    List<SpaceModerator>? moderators,
    List<SpaceCategory>? categories,
    SpaceStats? stats,
    DateTime? lastActivity,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Space(
      id: id ?? this.id,
      name: name ?? this.name,
      slug: slug ?? this.slug,
      description: description ?? this.description,
      rules: rules ?? this.rules,
      icon: icon ?? this.icon,
      banner: banner ?? this.banner,
      color: color ?? this.color,
      isPublic: isPublic ?? this.isPublic,
      isActive: isActive ?? this.isActive,
      allowQuestions: allowQuestions ?? this.allowQuestions,
      allowDiscussions: allowDiscussions ?? this.allowDiscussions,
      requireApproval: requireApproval ?? this.requireApproval,
      allowAnonymous: allowAnonymous ?? this.allowAnonymous,
      memberCount: memberCount ?? this.memberCount,
      postCount: postCount ?? this.postCount,
      questionCount: questionCount ?? this.questionCount,
      discussionCount: discussionCount ?? this.discussionCount,
      defaultTags: defaultTags ?? this.defaultTags,
      owner: owner ?? this.owner,
      moderators: moderators ?? this.moderators,
      categories: categories ?? this.categories,
      stats: stats ?? this.stats,
      lastActivity: lastActivity ?? this.lastActivity,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}

@JsonSerializable()
class SpaceModerator {
  final String user;
  final String addedBy;
  final DateTime addedAt;

  SpaceModerator({
    required this.user,
    required this.addedBy,
    required this.addedAt,
  });

  factory SpaceModerator.fromJson(Map<String, dynamic> json) => _$SpaceModeratorFromJson(json);
  Map<String, dynamic> toJson() => _$SpaceModeratorToJson(this);
}

@JsonSerializable()
class SpaceCategory {
  final String name;
  final String? description;
  final String color;
  final int order;

  SpaceCategory({
    required this.name,
    this.description,
    required this.color,
    required this.order,
  });

  factory SpaceCategory.fromJson(Map<String, dynamic> json) => _$SpaceCategoryFromJson(json);
  Map<String, dynamic> toJson() => _$SpaceCategoryToJson(this);
}

@JsonSerializable()
class SpaceStats {
  final int totalViews;
  final int totalVotes;
  final double averageResponseTime;
  final int unansweredQuestions;

  SpaceStats({
    required this.totalViews,
    required this.totalVotes,
    required this.averageResponseTime,
    required this.unansweredQuestions,
  });

  factory SpaceStats.fromJson(Map<String, dynamic> json) => _$SpaceStatsFromJson(json);
  Map<String, dynamic> toJson() => _$SpaceStatsToJson(this);
}
