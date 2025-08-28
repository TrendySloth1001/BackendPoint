import 'package:json_annotation/json_annotation.dart';

part 'answer.g.dart';

@JsonSerializable()
class Answer {
  final String id;
  final String body;
  final String? bodyHtml;
  final String post;
  final String author;
  final String status;
  final int voteCount;
  final int upvoteCount;
  final int downvoteCount;
  final int commentCount;
  final int score;
  @JsonKey(defaultValue: false)
  final bool isAccepted;
  final DateTime? acceptedAt;
  final String? acceptedBy;
  @JsonKey(defaultValue: false)
  final bool isLocked;
  final String? moderationNotes;
  final DateTime? deletedAt;
  final String? deletedBy;
  final List<AnswerEditHistory>? editHistory;
  final DateTime? lastEditedAt;
  final String? lastEditedBy;
  final DateTime createdAt;
  final DateTime updatedAt;

  Answer({
    required this.id,
    required this.body,
    this.bodyHtml,
    required this.post,
    required this.author,
    required this.status,
    required this.voteCount,
    required this.upvoteCount,
    required this.downvoteCount,
    required this.commentCount,
    required this.score,
    required this.isAccepted,
    this.acceptedAt,
    this.acceptedBy,
    required this.isLocked,
    this.moderationNotes,
    this.deletedAt,
    this.deletedBy,
    this.editHistory,
    this.lastEditedAt,
    this.lastEditedBy,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Answer.fromJson(Map<String, dynamic> json) => _$AnswerFromJson(json);
  Map<String, dynamic> toJson() => _$AnswerToJson(this);

  Answer copyWith({
    String? id,
    String? body,
    String? bodyHtml,
    String? post,
    String? author,
    String? status,
    int? voteCount,
    int? upvoteCount,
    int? downvoteCount,
    int? commentCount,
    int? score,
    bool? isAccepted,
    DateTime? acceptedAt,
    String? acceptedBy,
    bool? isLocked,
    String? moderationNotes,
    DateTime? deletedAt,
    String? deletedBy,
    List<AnswerEditHistory>? editHistory,
    DateTime? lastEditedAt,
    String? lastEditedBy,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Answer(
      id: id ?? this.id,
      body: body ?? this.body,
      bodyHtml: bodyHtml ?? this.bodyHtml,
      post: post ?? this.post,
      author: author ?? this.author,
      status: status ?? this.status,
      voteCount: voteCount ?? this.voteCount,
      upvoteCount: upvoteCount ?? this.upvoteCount,
      downvoteCount: downvoteCount ?? this.downvoteCount,
      commentCount: commentCount ?? this.commentCount,
      score: score ?? this.score,
      isAccepted: isAccepted ?? this.isAccepted,
      acceptedAt: acceptedAt ?? this.acceptedAt,
      acceptedBy: acceptedBy ?? this.acceptedBy,
      isLocked: isLocked ?? this.isLocked,
      moderationNotes: moderationNotes ?? this.moderationNotes,
      deletedAt: deletedAt ?? this.deletedAt,
      deletedBy: deletedBy ?? this.deletedBy,
      editHistory: editHistory ?? this.editHistory,
      lastEditedAt: lastEditedAt ?? this.lastEditedAt,
      lastEditedBy: lastEditedBy ?? this.lastEditedBy,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}

@JsonSerializable()
class AnswerEditHistory {
  final String? body;
  final String editedBy;
  final DateTime editedAt;
  final String? reason;

  AnswerEditHistory({
    this.body,
    required this.editedBy,
    required this.editedAt,
    this.reason,
  });

  factory AnswerEditHistory.fromJson(Map<String, dynamic> json) => _$AnswerEditHistoryFromJson(json);
  Map<String, dynamic> toJson() => _$AnswerEditHistoryToJson(this);
}
