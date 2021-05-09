from .serializers import ProductSerializer
from .models import Product
from rest_framework import viewsets,permissions

# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    # show only those products which are currently in stock
    queryset = Product.objects.filter(stock__gte = 1).order_by('id')
    serializer_class = ProductSerializer
    lookup_field = 'id'
    http_method_names = ['get']

    # passing request in context for fetching complete url
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context