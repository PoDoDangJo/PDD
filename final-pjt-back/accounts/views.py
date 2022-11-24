from django.contrib.auth import get_user_model
from django.contrib.auth import logout as auth_logout
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.views.decorators.http import require_POST
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserProfileSerializer
from django.http import JsonResponse

User = get_user_model()

# Create your views here.

@api_view(['GET'])
def profile(request, username):
    if request.method == 'GET':
        user = get_object_or_404(User, username=username)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)

@api_view(['DELETE'])
def user_delete(request, username):
    if request.user.is_authenticated:
        request.user.delete()
        auth_logout(request)
    return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['GET'])
# def profile(request, username):
#     if request.method == 'GET':
#         user = get_object_or_404(User, username=username)
#         user_profile = {
#             'user_name' : user.username,
#             'user_id' : user.pk,
#             'user_email' : user.email,
#             'user_like_movies' : user.like_movies.values(),
#             'user_like_movie_comments' : user.like_movie_comment.values(),
#             'user_like_reviews' : user.like_reviews.values(),
#             'user_like_reviews_comments' : user.like_comments.values(),
#             'user_like_reviews_comments' : user.like_comments.values()
#         }
#         return JsonResponse(user_profile, safe=False)

# def article_json_1(request):
#     articles = Article.objects.all()
#     articles_json = []

#     for article in articles:
#         articles_json.append(
#             {
#                 'id': article.pk,
#                 'title': article.title,
#                 'content': article.content,
#                 'created_at' : article.created_at,
#                 'updated_at' : article.updated_at,

#             }
#         )
#     return JsonResponse(articles_json, safe=False)



# @require_POST
# def follow(request, username):
#     print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
#     if request.user.is_authenticated:
#         User = get_user_model()
#         me = request.user
#         you = User.objects.get(pk=user_pk)
#         print('ㅇㅅㅇ')
#         print(you)
#         print(me)
#         print('ㅇㅁㅇ')
#         if me != you:
#             if you.followers.filter(pk=me.pk).exists():
#                 you.followers.remove(me)
#                 is_followed = False
#             else:
#                 you.followers.add(me)
#                 is_followed = True
#             context = {
#                 'is_followed': is_followed,
#                 'followers_count': you.followers.count(),
#                 'followings_count': you.followings.count(),
#             }
#             return JsonResponse(context)
#     context = {}
#     return JsonResponse(context)
