import 'package:json_annotation/json_annotation.dart';

part 'post.g.dart';

@JsonSerializable()
class Post {
  final String id;
  final String title;
  final String body;
  final String? bodyHtml;
  final String mode;
  final String status;
  final String author;
  final String space;
  final List<String>? tags;
  @JsonKey(defaultValue: false)
  final bool isAnswered;
  final String? acceptedAnswer;
  final PostBounty? bounty;
  final int viewCount;
  final int answerCount;
  final int commentCount;
  final int voteCount;
  final int upvoteCount;
  final int downvoteCount;
  final int score;
  final double hotScore;
  @JsonKey(defaultValue: false)
  final bool isLocked;
  @JsonKey(defaultValue: false)
  final bool isPinned;
  @JsonKey(defaultValue: false)
  final bool isFeatured;
  final String? moderationNotes;
  final DateTime? deletedAt;
  final String? deletedBy;
  final List<PostEditHistory>? editHistory;
  final DateTime? lastActivity;
  final DateTime? lastEditedAt;
  final String? lastEditedBy;
  final DateTime createdAt;
  final DateTime updatedAt;

  Post({
    required this.id,
    required this.title,
    required this.body,
    this.bodyHtml,
    required this.mode,
    required this.status,
    required this.author,
    required this.space,
    this.tags,
    required this.isAnswered,
    this.acceptedAnswer,
    this.bounty,
    required this.viewCount,
    required this.answerCount,
    required this.commentCount,
    required this.voteCount,
    required this.upvoteCount,
    required this.downvoteCount,
    required this.score,
    required this.hotScore,
    required this.isLocked,
    required this.isPinned,
    required this.isFeatured,
    this.moderationNotes,
    this.deletedAt,
    this.deletedBy,
    this.editHistory,
    this.lastActivity,
    this.lastEditedAt,
    this.lastEditedBy,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Post.fromJson(Map<String, dynamic> json) => _$PostFromJson(json);
  Map<String, dynamic> toJson() => _$PostToJson(this);

  bool get isQuestion => mode == 'question';
  bool get isDiscussion => mode == 'discussion';
  bool get canBeAnswered => isQuestion && !isAnswered && status == 'active';

  Post copyWith({
    String? id,
    String? title,
    String? body,
    String? bodyHtml,
    String? mode,
    String? status,
    String? author,
    String? space,
    List<String>? tags,
    bool? isAnswered,
    String? acceptedAnswer,
    PostBounty? bounty,
    int? viewCount,
    int? answerCount,
    int? commentCount,
    int? voteCount,
    int? upvoteCount,
    int? downvoteCount,
    int? score,
    double? hotScore,
    bool? isLocked,
    bool? isPinned,
    bool? isFeatured,
    String? moderationNotes,
    DateTime? deletedAt,
    String? deletedBy,
    List<PostEditHistory>? editHistory,
    DateTime? lastActivity,
    DateTime? lastEditedAt,
    String? lastEditedBy,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Post(
      id: id ?? this.id,
      title: title ?? this.title,
      body: body ?? this.body,
      bodyHtml: bodyHtml ?? this.bodyHtml,
      mode: mode ?? this.mode,
      status: status ?? this.status,
      author: author ?? this.author,
      space: space ?? this.space,
      tags: tags ?? this.tags,
      isAnswered: isAnswered ?? this.isAnswered,
      acceptedAnswer: acceptedAnswer ?? this.acceptedAnswer,
      bounty: bounty ?? this.bounty,
      viewCount: viewCount ?? this.viewCount,
      answerCount: answerCount ?? this.answerCount,
      commentCount: commentCount ?? this.commentCount,
      voteCount: voteCount ?? this.voteCount,
      upvoteCount: upvoteCount ?? this.upvoteCount,
      downvoteCount: downvoteCount ?? this.downvoteCount,
      score: score ?? this.score,
      hotScore: hotScore ?? this.hotScore,
      isLocked: isLocked ?? this.isLocked,
      isPinned: isPinned ?? this.isPinned,
      isFeatured: isFeatured ?? this.isFeatured,
      moderationNotes: moderationNotes ?? this.moderationNotes,
      deletedAt: deletedAt ?? this.deletedAt,
      deletedBy: deletedBy ?? this.deletedBy,
      editHistory: editHistory ?? this.editHistory,
      lastActivity: lastActivity ?? this.lastActivity,
      lastEditedAt: lastEditedAt ?? this.lastEditedAt,
      lastEditedBy: lastEditedBy ?? this.lastEditedBy,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}

@JsonSerializable()
class PostBounty {
  final int amount;
  final DateTime? expiresAt;

  PostBounty({
    required this.amount,
    this.expiresAt,
  });

  factory PostBounty.fromJson(Map<String, dynamic> json) => _$PostBountyFromJson(json);
  Map<String, dynamic> toJson() => _$PostBountyToJson(this);
}

@JsonSerializable()
class PostEditHistory {
  final String? title;
  final String? body;
  final List<String>? tags;
  final String editedBy;
  final DateTime editedAt;
  final String? reason;

  PostEditHistory({
    this.title,
    this.body,
    this.tags,
    required this.editedBy,
    required this.editedAt,
    this.reason,
  });

  factory PostEditHistory.fromJson(Map<String, dynamic> json) => _$PostEditHistoryFromJson(json);
  Map<String, dynamic> toJson() => _$PostEditHistoryToJson(this);
}
