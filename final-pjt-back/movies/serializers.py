from rest_framework import serializers
from .models import Movie, MovieComment


class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class MovieCommentSerializer(serializers.ModelSerializer):
    # user = UserInfoSerializer(read_only=True)
    like_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = MovieComment
        fields = '__all__'
        read_only_fields = ('movie','like_users',)

class MovieSerializer(serializers.ModelSerializer):
    moviecomment_set = MovieCommentSerializer(many=True, read_only=True)
    moviecomment_count = serializers.IntegerField(source='moviecomment_set.count', read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
