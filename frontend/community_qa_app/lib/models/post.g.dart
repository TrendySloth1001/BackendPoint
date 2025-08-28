// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'post.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Post _$PostFromJson(Map<String, dynamic> json) => Post(
      id: json['id'] as String,
      title: json['title'] as String,
      body: json['body'] as String,
      bodyHtml: json['bodyHtml'] as String?,
      mode: json['mode'] as String,
      status: json['status'] as String,
      author: json['author'] as String,
      space: json['space'] as String,
      tags: (json['tags'] as List<dynamic>?)?.map((e) => e as String).toList(),
      isAnswered: json['isAnswered'] as bool? ?? false,
      acceptedAnswer: json['acceptedAnswer'] as String?,
      bounty: json['bounty'] == null
          ? null
          : PostBounty.fromJson(json['bounty'] as Map<String, dynamic>),
      viewCount: (json['viewCount'] as num).toInt(),
      answerCount: (json['answerCount'] as num).toInt(),
      commentCount: (json['commentCount'] as num).toInt(),
      voteCount: (json['voteCount'] as num).toInt(),
      upvoteCount: (json['upvoteCount'] as num).toInt(),
      downvoteCount: (json['downvoteCount'] as num).toInt(),
      score: (json['score'] as num).toInt(),
      hotScore: (json['hotScore'] as num).toDouble(),
      isLocked: json['isLocked'] as bool? ?? false,
      isPinned: json['isPinned'] as bool? ?? false,
      isFeatured: json['isFeatured'] as bool? ?? false,
      moderationNotes: json['moderationNotes'] as String?,
      deletedAt: json['deletedAt'] == null
          ? null
          : DateTime.parse(json['deletedAt'] as String),
      deletedBy: json['deletedBy'] as String?,
      editHistory: (json['editHistory'] as List<dynamic>?)
          ?.map((e) => PostEditHistory.fromJson(e as Map<String, dynamic>))
          .toList(),
      lastActivity: json['lastActivity'] == null
          ? null
          : DateTime.parse(json['lastActivity'] as String),
      lastEditedAt: json['lastEditedAt'] == null
          ? null
          : DateTime.parse(json['lastEditedAt'] as String),
      lastEditedBy: json['lastEditedBy'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );

Map<String, dynamic> _$PostToJson(Post instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'body': instance.body,
      'bodyHtml': instance.bodyHtml,
      'mode': instance.mode,
      'status': instance.status,
      'author': instance.author,
      'space': instance.space,
      'tags': instance.tags,
      'isAnswered': instance.isAnswered,
      'acceptedAnswer': instance.acceptedAnswer,
      'bounty': instance.bounty,
      'viewCount': instance.viewCount,
      'answerCount': instance.answerCount,
      'commentCount': instance.commentCount,
      'voteCount': instance.voteCount,
      'upvoteCount': instance.upvoteCount,
      'downvoteCount': instance.downvoteCount,
      'score': instance.score,
      'hotScore': instance.hotScore,
      'isLocked': instance.isLocked,
      'isPinned': instance.isPinned,
      'isFeatured': instance.isFeatured,
      'moderationNotes': instance.moderationNotes,
      'deletedAt': instance.deletedAt?.toIso8601String(),
      'deletedBy': instance.deletedBy,
      'editHistory': instance.editHistory,
      'lastActivity': instance.lastActivity?.toIso8601String(),
      'lastEditedAt': instance.lastEditedAt?.toIso8601String(),
      'lastEditedBy': instance.lastEditedBy,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
    };

PostBounty _$PostBountyFromJson(Map<String, dynamic> json) => PostBounty(
      amount: (json['amount'] as num).toInt(),
      expiresAt: json['expiresAt'] == null
          ? null
          : DateTime.parse(json['expiresAt'] as String),
    );

Map<String, dynamic> _$PostBountyToJson(PostBounty instance) =>
    <String, dynamic>{
      'amount': instance.amount,
      'expiresAt': instance.expiresAt?.toIso8601String(),
    };

PostEditHistory _$PostEditHistoryFromJson(Map<String, dynamic> json) =>
    PostEditHistory(
      title: json['title'] as String?,
      body: json['body'] as String?,
      tags: (json['tags'] as List<dynamic>?)?.map((e) => e as String).toList(),
      editedBy: json['editedBy'] as String,
      editedAt: DateTime.parse(json['editedAt'] as String),
      reason: json['reason'] as String?,
    );

Map<String, dynamic> _$PostEditHistoryToJson(PostEditHistory instance) =>
    <String, dynamic>{
      'title': instance.title,
      'body': instance.body,
      'tags': instance.tags,
      'editedBy': instance.editedBy,
      'editedAt': instance.editedAt.toIso8601String(),
      'reason': instance.reason,
    };
