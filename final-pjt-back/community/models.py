from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

# def user_image_path(instance, filename):
#     return f'reviews/{instance.user.username}/{filename}'

# Create your models here.
class Review(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='review')
    like_users = models.ManyToManyField(User, related_name='like_reviews', blank=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    spoiler = models.BooleanField()
    # review_image = models.ImageField(blank=True, upload_to=user_image_path)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    review_id = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='community_comment')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='community_comment')
    content = models.CharField(max_length=200)
    spoiler = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    like_users = models.ManyToManyField(User, related_name='like_comments', blank=True)


