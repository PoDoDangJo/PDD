from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

urlpatterns = [
    path('rates/', views.rates_list),
    path('movies/<int:movie_pk>/rates/', views.movie_rates),
    path('rates/<int:rate_pk>/likes/', views.rate_likes),
    path('rates/<int:rate_pk>/', views.rate_detail),
    
    # 영화 검색
    path('', views.movie_list),
    # path('movies/random/', views.movie_random),
    path('data/', views.data),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('movies/popularity/', views.movie_popularity),  # 인기영화
    path('movies/classic/', views.movie_classic),  # 고전영화
    # path('movies/similar/<int:movie_pk>/', views.movie_similar),  # 비슷한 영화
    path('movies/search/<str:words_target>', views.movie_search),  # 영화 검색

    # 영화 요소 검색
    path('actors/<movie_pk>/', views.movie_actors),  # 영화별 배우검색
    path('director/<movie_pk>/', views.movie_directors),  # 영화별 감독검색

    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui')
]