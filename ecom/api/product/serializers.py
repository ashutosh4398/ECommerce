from rest_framework import serializers
from .models import Product



class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id','name','description','price','image','category','stock']

    def get_image(self,instance):
        request = self.context.get("request")
        protocol = "https" if request.is_secure() else "http"
        return f"{protocol}://{request.META.get('HTTP_HOST')}{instance.image.url}" if instance.image else None
