from django.urls import path,include
from . import views

urlpatterns = [
    path('gettoken/',views.GenerateToken.as_view()),
    path('process/',views.ProcessPayment.as_view())
]
