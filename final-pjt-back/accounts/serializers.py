from rest_framework import serializers
from django.contrib.auth import get_user_model

# 유저 프로필
class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = get_user_model()
        fields = ('username',)

