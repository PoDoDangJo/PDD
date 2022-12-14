from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import JsonResponse
from .serializers import ReviewListSerializer, ReviewSerializer, CommentSerializer
from .models import Review, Comment


@api_view(['GET', 'POST'])
def review_list(request):
    if request.method == 'GET':
        review = get_list_or_404(Review)
        serializer = ReviewListSerializer(review, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user_id=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def review_detail(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'GET':
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = ReviewSerializer(review, data=request.data)  # POST와 차이
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['GET'])
def comment_list(request):
    if request.method == 'GET':
        comment = get_list_or_404(Comment)
        serializer = CommentSerializer(comment, many=True)
        return Response(serializer.data)


@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['POST'])
def comment_create(request, review_pk):
    # if 'image' in request.Files:
    #     image = request.Files['image']
    review = get_object_or_404(Review, pk=review_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user_id=request.user, review_id=review)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def likes(request, review_pk):
    if request.user.is_authenticated:
        review = get_object_or_404(Review, pk=review_pk)
        if review.like_users.filter(pk=request.user.pk).exists():
            review.like_users.remove(request.user)
            is_liked = False
        else:
            review.like_users.add(request.user)
            is_liked = True
        context = {
            'is_liked': is_liked,
            'user_id': request.user.id,
            'username' : request.user.username,
        }
        return JsonResponse(context)
    context = {}
    return JsonResponse(context)

@api_view(['POST'])
def comment_like(request, comment_pk):
    if request.user.is_authenticated:
        comment = get_object_or_404(Comment, pk=comment_pk)
        if comment.like_users.filter(pk=request.user.pk).exists():
            comment.like_users.remove(request.user)
            is_liked = False
        else:
            comment.like_users.add(request.user)
            is_liked = True
        context = {
            'is_liked': is_liked,
            'user_id': request.user.id,
            'username' : request.user.username,
        }
        return JsonResponse(context)
    context = {}
    return JsonResponse(context)