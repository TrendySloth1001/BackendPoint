// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'answer.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Answer _$AnswerFromJson(Map<String, dynamic> json) => Answer(
      id: json['id'] as String,
      body: json['body'] as String,
      bodyHtml: json['bodyHtml'] as String?,
      post: json['post'] as String,
      author: json['author'] as String,
      status: json['status'] as String,
      voteCount: (json['voteCount'] as num).toInt(),
      upvoteCount: (json['upvoteCount'] as num).toInt(),
      downvoteCount: (json['downvoteCount'] as num).toInt(),
      commentCount: (json['commentCount'] as num).toInt(),
      score: (json['score'] as num).toInt(),
      isAccepted: json['isAccepted'] as bool? ?? false,
      acceptedAt: json['acceptedAt'] == null
          ? null
          : DateTime.parse(json['acceptedAt'] as String),
      acceptedBy: json['acceptedBy'] as String?,
      isLocked: json['isLocked'] as bool? ?? false,
      moderationNotes: json['moderationNotes'] as String?,
      deletedAt: json['deletedAt'] == null
          ? null
          : DateTime.parse(json['deletedAt'] as String),
      deletedBy: json['deletedBy'] as String?,
      editHistory: (json['editHistory'] as List<dynamic>?)
          ?.map((e) => AnswerEditHistory.fromJson(e as Map<String, dynamic>))
          .toList(),
      lastEditedAt: json['lastEditedAt'] == null
          ? null
          : DateTime.parse(json['lastEditedAt'] as String),
      lastEditedBy: json['lastEditedBy'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$AnswerToJson(Answer instance) => <String, dynamic>{
      'id': instance.id,
      'body': instance.body,
      'bodyHtml': instance.bodyHtml,
      'post': instance.post,
      'author': instance.author,
      'status': instance.status,
      'voteCount': instance.voteCount,
      'upvoteCount': instance.upvoteCount,
      'downvoteCount': instance.downvoteCount,
      'commentCount': instance.commentCount,
      'score': instance.score,
      'isAccepted': instance.isAccepted,
      'acceptedAt': instance.acceptedAt?.toIso8601String(),
      'acceptedBy': instance.acceptedBy,
      'isLocked': instance.isLocked,
      'moderationNotes': instance.moderationNotes,
      'deletedAt': instance.deletedAt?.toIso8601String(),
      'deletedBy': instance.deletedBy,
      'editHistory': instance.editHistory,
      'lastEditedAt': instance.lastEditedAt?.toIso8601String(),
      'lastEditedBy': instance.lastEditedBy,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
    };

AnswerEditHistory _$AnswerEditHistoryFromJson(Map<String, dynamic> json) =>
    AnswerEditHistory(
      body: json['body'] as String?,
      editedBy: json['editedBy'] as String,
      editedAt: DateTime.parse(json['editedAt'] as String),
      reason: json['reason'] as String?,
    );

Map<String, dynamic> _$AnswerEditHistoryToJson(AnswerEditHistory instance) =>
    <String, dynamic>{
      'body': instance.body,
      'editedBy': instance.editedBy,
      'editedAt': instance.editedAt.toIso8601String(),
      'reason': instance.reason,
    };
