from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'id',)


class ActorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Actor
        fields = '__all__'
        read_only_fields = ('id',)


class GenreSerializer(serializers.ModelSerializer):

        class Meta:
            model = Genres
            fields = ('name',)


class DirectorSerializer(serializers.ModelSerializer):

        class Meta:
            model = Director
            fields = '__all__'
            read_only_fields = ('movie',)


class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = '__all__'
#         read_only_fields = ('movie_id', 'user_id', 'like_users')  # 유효성 검사에서 빼서 읽기전용필드로 만들기


class RatingSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)

    class Meta:
        model = Rating
        fields = '__all__'
        read_only_fields = ('movie_id', 'like_users', 'user_id')


class MovieSerializer(serializers.ModelSerializer):
    genre_ids = GenreSerializer(many=True, read_only=True)
    director = DirectorSerializer(many=True, read_only=True)
    actors = ActorSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
        # read_only_fields = ()


class SimilarMovieSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Movie
        fields = ('id', 'poster_path')
        read_only_fields = ('movie_id', 'user_id', 'like_users')