from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, CustomJWTSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login,logout
import re
import random
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.


# customizing JWT
class CustomTokenObtainPairView(TokenObtainPairView):
    """ JUST FOR ADDED FUTURE REQUIREMENTS TO BE RETURNED """
    serializer_class = CustomJWTSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer
    http_method_names = ['post','put']

