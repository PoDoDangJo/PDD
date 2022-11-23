from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.models import Rating
from community.models import Review, Comment

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
        # read_only_fields = ('user_id', 'like_users', 'movie_id')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        # read_only_fields = ('user_id', 'like_users',)

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        # read_only_fields = ('review_id',)
# 유저 프로필

class UserProfileSerializer(serializers.ModelSerializer):
    like_rating = RatingSerializer(many=True, read_only=True)
    like_reviews = ReviewSerializer(many=True, read_only=True)
    like_comments = CommentSerializer(many=True, read_only=True)
    rating = RatingSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'profile_image', 'last_login', 'date_joined', 'followings', 'like_rating', 'like_reviews', 'like_comments', 'rating')
        read_only_fields = ('followings',)
