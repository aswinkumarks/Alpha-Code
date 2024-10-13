from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import HttpRequest, JsonResponse
from django.contrib.auth.models import User

from .serializers import UserSerializer


class UserList(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = UserSerializer


def getUserInfo(request: HttpRequest):
    if not request.user.is_authenticated:
        return {}

    user = request.user
    user_data = UserSerializer(user).data
    return JsonResponse(user_data)
