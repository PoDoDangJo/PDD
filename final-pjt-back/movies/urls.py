from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_list),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('moviecomments/', views.moviecomment_list),
    path('moviecomments/<int:moviecomment_pk>/', views.moviecomment_detail),
    path('movies/<int:movie_pk>/moviecomments/', views.moviecomment_create),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui')
]
