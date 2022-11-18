from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from django.views.decorators.http import require_POST
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from django.http import JsonResponse


# Create your views here.

@api_view(['GET'])
def profile(request, username):
    User = get_user_model()
    user = get_object_or_404(User, username=username)
    print(user)
    serializer = UserProfileSerializer(user)
    print('ㅇㅅㅇ')
    print(serializer)
    print(serializer.data)
    print('ㅇㅁㅇ')
    return Response(serializer.data)


@require_POST
def follow(request, user_pk):
    print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    if request.user.is_authenticated:
        User = get_user_model()
        me = request.user
        you = User.objects.get(pk=user_pk)
        print('ㅇㅅㅇ')
        print(you)
        print(me)
        print('ㅇㅁㅇ')
        if me != you:
            if you.followers.filter(pk=me.pk).exists():
                you.followers.remove(me)
                is_followed = False
            else:
                you.followers.add(me)
                is_followed = True
            context = {
                'is_followed': is_followed,
                'followers_count': you.followers.count(),
                'followings_count': you.followings.count(),
            }
            return JsonResponse(context)
    context = {}
    return JsonResponse(context)
