from rest_framework import viewsets
from .models import Order, OrderInfo
from .serializers import OrderSerializer, UpdateOrDeleteCartItemsSerializer
from rest_framework.response import Response
from api.product.models import Product

# Create your views here


class OrderViewSet(viewsets.ModelViewSet):
    """ CREATE CART AND SHOW CART ITEMS """
    serializer_class = OrderSerializer
    # we need to disable edit and delete request on Order by normal users
    http_method_names = ['get','post']

    
    def create(self, request, *args, **kwargs):
        """ USED TO CUSTOMIZE POST METHOD """

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        # check first whether cart/order is intiaited
        order,_ = Order.objects.get_or_create(user=request.user,transaction_id = 0)
        for product in serializer.validated_data.get('products',[]):
            # getting product object
            try:
                prod = Product.objects.get(id=product.get("product_info").get('id'))
                # order.products.add(prod, through_defaults={"quantity": product.get("quantity"), "amount": product.get("quantity") * prod.price })
                # order.save()
                prod.stock -= product.get("quantity")
                prod.save()
                order_info = OrderInfo(
                    order=order,
                    product=prod,
                    quantity = product.get("quantity"),
                    amount = product.get("quantity") * prod.price
                )
                order_info.save()
                
            except Exception as e:
                print(e)
                return Response({"error": "Some error"})
        
        
        return Response({"success": "Product added successfully"})

    def get_queryset(self):
        # return that order/cart for whom payment is not yet initiated/done
        user = self.request.user
        return Order.objects.filter(user=user,transaction_id=0)


class UpdateOrDeleteCartItems(viewsets.ModelViewSet):
    serializer_class = UpdateOrDeleteCartItemsSerializer
    lookup_field = 'id'
    queryset = OrderInfo.objects.all()
    http_method_names = ['put','delete']