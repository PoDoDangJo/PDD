from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

def user_image_path(instance, filename):
    return f'users/{instance.user.username}/{filename}'


class User(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    profile_image = models.ImageField(upload_to=user_image_path, blank=True)