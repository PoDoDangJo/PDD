from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_list),
    # path('movies/random/', views.movie_random),
    path('data/', views.data),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('comments/<int:comment_pk>/likes/', views.comment_likes),
    path('movies/<int:movie_pk>/comments/', views.comment_create),
    path('movies/<int:movie_pk>/rates/', views.movie_rates),
    path('movies/popularity/', views.movie_popularity),  # 인기영화
    path('movies/classic/', views.movie_classic),  # 고전영화
    path('movies/search/<str:words_target>', views.movie_search),  # 영화 검색
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui')
]