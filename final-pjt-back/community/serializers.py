from rest_framework import serializers
from .models import Review, Comment
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'id',)

class ReviewListSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ('id', 'title', 'content', 'created_at', 'updated_at', 'user_id')

class CommentSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('review_id',)  # 유효성 검사에서 빼서 읽기전용필드로 만들기


class ReviewSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
        # read_only_fields = ('user_id',)
