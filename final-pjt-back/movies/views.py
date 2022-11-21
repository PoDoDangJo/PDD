import requests
import re
import datetime

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse

from .serializers import *
from .models import *


@api_view(['GET', 'POST'])
def movie_list(request):
    if request.method == 'GET':
        movie = get_list_or_404(Movie)
        serializer = MovieListSerializer(movie, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return Response(serializer.data)


@api_view(['GET'])
def comment_list(request):
    if request.method == 'GET':
        comment = get_list_or_404(Comment)
        serializer = CommentSerializer(comment, many=True)
        return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['POST'])
def comment_create(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user_id=request.user, movie_id=movie)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def movie_likes(request, movie_pk):
    if request.user.is_authenticated:
        movie = get_object_or_404(Movie, pk=movie_pk)
        if movie.like_users.filter(pk=request.user.pk).exists():
            movie.like_users.remove(request.user)
            is_liked = False
        else:
            movie.like_users.add(request.user)
            is_liked = True
        context = {
            'is_liked': is_liked,
        }
        return JsonResponse(context)
    context = {}
    return JsonResponse(context)


@api_view(['POST'])
def comment_likes(request, comment_pk):
    if request.user.is_authenticated:
        comment = get_object_or_404(Comment, pk=comment_pk)
        if comment.like_users.filter(pk=request.user.pk).exists():
            comment.like_users.remove(request.user)
            is_liked = False
        else:
            comment.like_users.add(request.user)
            is_liked = True
        context = {
            'is_liked': is_liked,
        }
        return JsonResponse(context)
    context = {}
    return JsonResponse(context)

# 인기순 영화 필터
# - 기준 : 전체에서 영화만
@api_view(['GET'])
def movie_popularity(request):
    movies = Movie.objects.all().order_by('-popularity')
    serializers = MovieListSerializer(movies, many=True)
    return Response(serializers.data)

# 고전 영화 필터
# - 기준 : 2000년대 이전, 평점 높은 순, 트레일러 있는 영화만, 20개
@api_view(['GET'])
def movie_classic(request):
    start_date = datetime.date(1000, 1, 1)
    end_date = datetime.date(1999, 12, 31)
    movies = Movie.objects.filter(release_date__range=(start_date, end_date)).order_by('-vote_average')
    serializers = MovieListSerializer(movies[:20], many=True)
    return Response(serializers.data)

############################################################################################

TMDB_API_KEY =  '7135f382285b7a42b12f2513bd58adb1' 
BASE_URL = 'https://api.themoviedb.org/3/movie'
actor_pk = 20090


@api_view(['GET'])
def get_actors(movie):
    global actor_pk
    movie_id = movie.id
    # print("test: credit response!")
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}/credits',
        params={
            'api_key': TMDB_API_KEY,
            'language': 'ko-KR',
        }
    ).json()
    for person in response.get('cast'):
        if person.get('known_for_department') != 'Acting':
            continue
        if not person.get('character'):
            continue 
        actor_id = person.get('id')
        character_name = person.get('character')
        request_url_person = f'https://api.themoviedb.org/3/person/{actor_id}?api_key={TMDB_API_KEY}&language=ko-KR'
        # print(f"test: actor response_{actor_pk}!")
        try:
            response = requests.get(request_url_person).json()
        except:
            print(f"error: actor_{actor_id}!")
            continue
        korean_name = 0
        for _name in response.get('also_known_as'):
            hanCount = len(re.findall(u'[\u3130-\u318F\uAC00-\uD7A3]+', _name))
            if hanCount:
                name = _name
                korean_name = 1
                break
        if korean_name == 0:
            name = response.get('name')
        if not Actor.objects.filter(pk=actor_id).exists():
            Actor.objects.create(
                id=response.get('id'),
                name=name,
                profile_path= response.get('profile_path'),
            )
        movie.actors.add(actor_id)

        try:
            character = Characters.objects.get(pk=actor_pk)
            character.character_name = character_name
            character.save()
            actor_pk += 1
            if movie.actors.count() == 5:
                break
        except :
            print(f"error: Character_{actor_pk}!")
        

def get_director(movie):
    movie_id = movie.id
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}/credits',
        params={
            'api_key': TMDB_API_KEY,
            'language': 'ko-kr',
        }
    ).json()
    
    for person in response.get('crew'):
        if person.get('job') != 'Director':
            continue
        director_id = person.get('id')
        request_url_person = f'https://api.themoviedb.org/3/person/{director_id}?api_key={TMDB_API_KEY}&language=ko-KR'
        try:
            response = requests.get(request_url_person).json()
        except:
            print(f"error: director_{director_id}!")
            continue
        korean_name = 0
        for _name in response.get('also_known_as'):
            hanCount = len(re.findall(u'[\u3130-\u318F\uAC00-\uD7A3]+', _name))
            if hanCount:
                name = _name
                korean_name = 1
                break
        if korean_name == 0:
            name = response.get('name')
        if not Director.objects.filter(pk=director_id).exists():
            Director.objects.create(
                id=response.get('id'),
                name=name,
                profile_path= response.get('profile_path'),
            )
        movie.director.add(director_id)
        if movie.director.count() == 1:
            break
    

def get_youtube_key(movie_dict):  
    movie_id = movie_dict.get('id')
    try:
        response = requests.get(
            f'https://api.themoviedb.org/3/movie/{movie_id}/videos',
            params={
                'api_key': TMDB_API_KEY
            }
        ).json()

        for video in response.get('results'):
            if video.get('site') == 'YouTube':
                return video.get('key')
        return 'nothing'
    except:
        return 'nothing'

@api_view(['GET'])
def data(request):
    # 장르 가져오기
    GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list'
    response = requests.get(
        GENRE_URL,
        params={
            'api_key': TMDB_API_KEY,
            'language': 'ko-kr',            
        }
    ).json()

    for genre in response.get('genres'):
        Genres.objects.create(
            id=genre.get('id'),
            name=genre.get('name')
        )
    
    print('인기 영화 목록')
    print('--------------------------------------------------------------')
    cnt = 1

    # for i in range(317, 501): #?
    for i in range(1, 100):
        
        print(f'page{i}')

        # popular api
        request_url = f"{BASE_URL}/popular?api_key={TMDB_API_KEY}&language=ko-KR&page={i}"
        print(request_url)
        movies = requests.get(request_url).json()
        
        
        for movie_dict in movies.get('results'): 
            if not movie_dict.get('release_date'):
                continue 
            if not movie_dict.get('overview'):
                continue
            if not movie_dict.get('poster_path'):
                continue
            trailer_key = get_youtube_key(movie_dict)
            movie_id = movie_dict.get('id')
            movie_name = movie_dict.get('title') 
            print(f'#{cnt} {movie_name}')
            cnt+=1 
            # 디테일 api
            request_url_detail = f"{BASE_URL}/{movie_id}?api_key={TMDB_API_KEY}&language=ko-KR"
            movie_detail = requests.get(request_url_detail).json()
            
            # 비슷한 영화 api
            request_url_similar= f'{BASE_URL}/{movie_id}/similar?api_key={TMDB_API_KEY}&language=ko-KR&page=1'
            movie_similars = requests.get(request_url_similar).json()
            similar_movies = []
            for similar in movie_similars.get('results'):
                if not similar.get('release_date'):
                    continue 
                if not similar.get('overview'):
                    continue
                if not similar.get('poster_path'):
                    continue
                similar_movies.append(similar.get('id'))
            
            if not Movie.objects.filter(pk=movie_detail.get('id')).exists():
                movie = Movie.objects.create(
                    id = movie_detail.get('id'),
                    adult = movie_detail.get('adult'),
                    title = movie_name,
                    tagline = movie_detail.get('tagline'),
                    # genre_id : ArrayField, 아래에서
                    overview = movie_detail.get('overview'),
                    poster_path = movie_detail.get('poster_path'),
                    backdrop_path = movie_detail.get('backdrop_path'),
                    # director : ManyToMany
                    # actors : ManyToMany
                    popularity = movie_detail.get('popularity'),
                    release_date = movie_detail.get('release_date'),
                    runtime = movie_detail.get('runtime'),
                    vote_average = movie_detail.get('vote_average'),
                    # Like_users : ManyToMany
                    trailer_youtube_key = trailer_key,
                    movie_similar = similar_movies,
                )

            for genre_id in movie_dict.get('genre_ids', []):
                movie.genre_ids.add(genre_id)
            
            get_actors(movie)    # 배우정보 더하기
            get_director(movie)  # 감독정보 더하기

    return JsonResponse(movie)



