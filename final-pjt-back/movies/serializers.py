from rest_framework import serializers
from .models import *


class ActorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Actor
        fields = ('name', 'profile_path')


class GenreSerializer(serializers.ModelSerializer):

        class Meta:
            model = Genres
            fields = ('name',)


class DirectorSerializer(serializers.ModelSerializer):

        class Meta:
            model = Director
            fields = ('name', 'profile_path')


class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('movie_id', 'user_id', 'like_users')  # 유효성 검사에서 빼서 읽기전용필드로 만들기


class MovieSerializer(serializers.ModelSerializer):
    genre_ids = GenreSerializer(many=True, read_only=True)
    director = DirectorSerializer(many=True, read_only=True)
    comment_set = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
        # read_only_fields = ()