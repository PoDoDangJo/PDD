from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views

urlpatterns = [
    # path('<str:username>/follow/', views.follow),
    # swagger settings
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('profile/<str:username>/', views.profile),
    path('delete/<str:username>/', views.user_delete),
]
