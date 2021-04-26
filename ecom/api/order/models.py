from django.db import models
from api.user.models import CustomUser
from api.product.models import Product
from django.db.models.signals import post_save, post_delete
from django.db.models import Sum

# Create your models here.
class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product,through="OrderInfo")
    total_products = models.CharField(max_length=500,default=0)
    transaction_id = models.CharField(max_length=250,default=0)
    total_amount = models.CharField(max_length=50,default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class OrderInfo(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    amount = models.FloatField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('order','product'),)


    def __str__(self):
        return f"{self.order.user.email} || {self.product.name} || {self.quantity}"

# TODO: Implement post_save and post_delete methods for automatically calculating total_products,
# stock left and many more ...
def place_order(sender,instance,created,**kwargs):
    print("insert called")
    # since we are adding products one by one in cart at backend
    # each product addition will invoke post_save method
    # now we need to update order
    order = instance.order
    order.total_products = order.orderinfo_set.all().count()
    order.total_amount = order.orderinfo_set.aggregate(amount=Sum('amount')).pop('amount') or 0
    order.save()

def delete_item_from_cart(sender,instance,**kwargs):
    print("delete called")
    product = instance.product
    product.stock += instance.quantity
    product.save()
    order = instance.order
    order.total_products = order.orderinfo_set.all().count()
    print(order.orderinfo_set.aggregate(amount=Sum('amount')).pop('amount'))
    order.total_amount = order.orderinfo_set.aggregate(amount=Sum('amount')).pop('amount') or 0
    order.save()
    

    
    
post_save.connect(receiver=place_order, sender=OrderInfo)
post_delete.connect(receiver=delete_item_from_cart, sender=OrderInfo)