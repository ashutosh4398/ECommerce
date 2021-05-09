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
        request = self.context.get('request')
        return ProductSerializer(instance.product,context={'request': request}).data


class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Order
        extra_kwargs = {'transaction_id': {'write_only': True}}
        fields = ['id','products','total_amount','transaction_id']
        # TODO: Add product and quantity

    def get_products(self,instance):
        request = self.context.get('request')
        all_products = instance.orderinfo_set.all()
        return OrderInfoSerializer(all_products,many=True,context={'request': request}).data

    def to_internal_value(self, data):
        return data
    
    def update(self,instance,validated_data):
        print(validated_data)
        instance.transaction_id = validated_data.get('transaction_id')
        instance.save()
        return instance

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


class ShowOrderHistorySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name")
    date = serializers.CharField(source="created_at")
    transaction_id = serializers.CharField(source="order.transaction_id")
    price = serializers.CharField(source="product.price")

    class Meta:
        model = OrderInfo
        fields = ['product_name','date','transaction_id','price']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['date'] = instance.created_at.strftime("%d,%b %Y")
        return representation