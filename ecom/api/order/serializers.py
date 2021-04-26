from rest_framework import serializers
from .models import Order,OrderInfo
from api.product.models import Product
from api.product.serializers import ProductSerializer

class OrderInfoSerializer(serializers.ModelSerializer):
    product_info = serializers.SerializerMethodField()
    cart_item_id = serializers.CharField(source = 'id')

    class Meta:
        model = OrderInfo
        fields = ['cart_item_id','product_info','quantity','amount']
    
    def get_product_info(self,instance):
        return ProductSerializer(instance.product).data


class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id','products']
        # TODO: Add product and quantity

    def get_products(self,instance):
        all_products = instance.orderinfo_set.all()
        return OrderInfoSerializer(all_products,many=True).data

    def to_internal_value(self, data):
        return data

class UpdateOrDeleteCartItemsSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(default=0,min_value=1)
    class Meta:
        model = OrderInfo
        fields = ['quantity']
    
    def update(self, instance, validated_data):
        old_quantity = instance.quantity
        new_quantity = validated_data.get("quantity")
        instance.product.stock -= (new_quantity - old_quantity)
        if instance.product.stock < 0:
            raise serializers.ValidationError({"error":"Out of stock"})
        instance.product.save()
        instance.amount = new_quantity * instance.product.price
        return super().update(instance, validated_data)