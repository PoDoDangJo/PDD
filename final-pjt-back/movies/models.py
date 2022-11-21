from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

User = settings.AUTH_USER_MODEL


class Actor(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, null=True)
    popularity = models.FloatField(null=True)
    profile_path = models.TextField(null=True)


class Director(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, null=True)
    popularity = models.FloatField(null=True)
    profile_path = models.TextField(null=True)


class Genres(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, null=True)


# Create your models here.
class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    adult = models.BooleanField(null=True)
    title = models.CharField(max_length=100, null=True)
    tagline = models.TextField(null=True)
    genre_ids = models.ManyToManyField(Genres, related_name="movies")
    overview = models.TextField(null=True)
    poster_path = models.CharField(max_length=200, null=True)
    backdrop_path = models.CharField(max_length=200, null=True)
    director = models.ManyToManyField(Director, related_name='movies')
    actors = models.ManyToManyField(Actor, related_name='movies' ,through='Characters')
    popularity = models.FloatField(null=True)
    release_date = models.DateField(null=True)
    runtime = models.IntegerField(null=True)
    vote_average = models.FloatField(null=True)
    # like_users = models.ManyToManyField(User, related_name='like_movies')
    trailer_youtube_key = models.TextField(null=True)
    movie_similar = models.JSONField(blank=True)


class Characters(models.Model):
    id = models.IntegerField(primary_key=True)
    movie_id = models.ForeignKey(Movie, on_delete=models.CASCADE,  related_name='characters_id')
    actor_id = models.ForeignKey(Actor, on_delete=models.CASCADE,  related_name='characters_id')
    character_name = models.CharField(max_length=100, null=True)


class Comment(models.Model):
    movie_id = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="movie_comment")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="movie_comment")
    content = models.TextField(max_length=200)
    spoiler = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    like_users = models.ManyToManyField(User, related_name='like_movie_comment')


class Rating(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_id = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='ratings')
    rate = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
