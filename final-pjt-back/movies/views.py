import requests
import re
import datetime
from django.db.models import Q, F


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse

from .serializers import *
from .models import *


# movie

@api_view(['GET'])
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


# rating

@api_view(['GET'])
def rates_list(request):
    if request.method == 'GET':
        rating = get_list_or_404(Rating)
        serializer = RatingSerializer(rating, many=True)
        return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
def rate_detail(request, rate_pk):
    rating = get_object_or_404(Rating, pk=rate_pk)

    if request.method == 'GET':
        serializer = RatingSerializer(rating)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        Rating.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = RatingSerializer(rating, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

@api_view(['POST'])
def movie_rates(request, movie_pk):
    if request.user.is_authenticated:
        movie = get_object_or_404(Movie, pk=movie_pk)
        rating = movie.ratings.filter(user_id=request.user)
        for data in rating.values():
            rating_data = data.get('rate')

        serializer = RatingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # 기존에 있었다면 삭제
            if movie.ratings.filter(user_id=request.user.pk).exists():
                rating.delete()
            
        serializer.save(user_id=request.user, movie_id=movie)
        context = {
            'rating': rating_data,
        }
        return JsonResponse(context)
    context = {}
    return JsonResponse(context)


@api_view(['POST'])
def rate_likes(request, rate_pk):
    if request.user.is_authenticated:
        rating = get_object_or_404(Rating, pk=rate_pk)
        if rating.like_users.filter(pk=request.user.pk).exists():
            rating.like_users.remove(request.user)
            is_liked = False
        else:
            rating.like_users.add(request.user)
            is_liked = True
        context = {
            'is_liked': is_liked,
        }
        return JsonResponse(context)
    context = {}
    return JsonResponse(context)

@api_view(['GET'])
def movie_random(request):
    movies = Movie.objects.all().order_by('?')
    serializers = MovieListSerializer(movies[:15], many=True)
    return Response(serializers.data)



# 영화 검색
@api_view(['GET']) 
def movie_search(request, words_target):
    movies = Movie.objects.annotate(
        
    )
    filter(Q(title__contains=words_target)) | Q(actors__name__contains=words_target) | Q(director=words_target)
    
    
    serializers = MovieListSerializer(movies[:10], many=True)
    return Response(serializers.data)


# 배우 검색
@api_view(['GET'])
def movie_actors(request, movie_pk):
    actors = Characters.objects.annotate(
        name = F('actor_id__name'),
        profile_path = F('actor_id__profile_path'),
        popularity = F('actor_id__popularity')
        ).values(
            'character_name', 'actor_id', 'name', 'profile_path', 'popularity'
            ).filter(movie_id=movie_pk)
    serializers = ActorSerializer(actors, many=True)
    return Response(serializers.data)


# 감독 검색
@api_view(['GET'])
def movie_directors(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    movie.director.values()
    serializers = DirectorSerializer(movie.director, many=True)
    return Response(serializers.data)


# 비슷한 영화 검색
# -기준 : 인기도 상위 3개
# @api_view(['GET'])
# def movie_similar(request, movie_pk):
#     similar_movies_id = Movie.objects.filter(id=movie_pk).values()
#     movie_similar = Movie.objects.filter(id__in = similar_movies_id)
#     serializers = MovieListSerializer(movie_similar, many=True)
#     return Response(serializers.data)


# 인기순 영화 필터
# - 기준 : 전체에서 영화만, 15개
@api_view(['GET'])
def movie_popularity(request):
    movies = Movie.objects.all().order_by('-popularity')
    serializers = MovieListSerializer(movies[:15], many=True)
    return Response(serializers.data)

# 고전 영화 필터
# - 기준 : 2000년대 이전, 평점 높은 순, 트레일러 있는 영화만, 20개
@api_view(['GET'])
def movie_classic(request):
    start_date = datetime.date(1000, 1, 1)
    end_date = datetime.date(1999, 12, 31)
    movies = Movie.objects.filter(release_date__range=(start_date, end_date)).exclude(trailer_youtube_key='nothing').order_by('-vote_average')
    serializers = MovieListSerializer(movies[:15], many=True)
    return Response(serializers.data)

############################################################################################

TMDB_API_KEY =  '7135f382285b7a42b12f2513bd58adb1' 
BASE_URL = 'https://api.themoviedb.org/3/movie'
actor_pk = 1


def get_actors(movie):
    global actor_pk
    movie_id = movie.id
    print("배우 가져오러 들어왔다구!")
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
                popularity = response.get('popularity'),
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
                popularity = response.get('popularity'),
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
        # 유튜브이고, 트레일러인 경우만 가져오기, 공식트레일러우선
        tmp = ''
        for video in response.get('results'):
            if video.get('site') == 'YouTube':
                if video.get('type') == 'Trailer':
                    if video.get('official') == 'true':
                        return video.get('key')
                    else:
                        tmp = video.get('key')
        if tmp:
            return tmp

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
    print('장르 채우기 완료!')
    
    cnt = 1

    for i in range(1, 501):
        
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
            print('디테일 api 저장까지 완료!')
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
            print('비슷한 영화 저장 완료!')
            
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
            print('장르 세팅 완료!')

            get_actors(movie)    # 배우정보 더하기
            print('배우정보 세팅완료!')
            get_director(movie)  # 감독정보 더하기
            print('감독정보 세팅완료!')

    return JsonResponse(movie)



