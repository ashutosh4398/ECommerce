from .serializers import ProductSerializer
from .models import Product
from rest_framework import viewsets,permissions

# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
    lookup_field = 'id'
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get']