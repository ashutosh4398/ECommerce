from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'',views.UserViewSet)

urlpatterns = [
    path('token/',views.CustomTokenObtainPairView.as_view()),
    path('token/refresh/',TokenRefreshView.as_view()),
    path('',include(router.urls))
]
