from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

urlpatterns = [
    path('', views.movie_list),
    path('data/', views.data),
    path('movie/<int:movie_pk>/', views.movie_detail),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('comments/<int:comment_pk>/likes/', views.comment_likes),
    path('movie/<int:movie_pk>/comments/', views.comment_create),
    path('movie/<int:movie_pk>/likes/', views.movie_likes),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui')
]