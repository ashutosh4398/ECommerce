from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'',views.OrderViewSet,basename="order_list")
router2 = DefaultRouter()
router2.register(r'',views.UpdateOrDeleteCartItems,basename="cart-list")

urlpatterns = [
    path('',include(router.urls)),
    path('cart/update/',include(router2.urls))
]
