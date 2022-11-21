from rest_framework import serializers
from django.contrib.auth import get_user_model

# 유저 프로필
class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = get_user_model()
        # fields = ('username', 'email', 'date_joined', 'profile_image', )
        # fields = ('username', 'email', 'date_joined', )
        fields = '__all__'
        read_only_fields = ('followings',)
