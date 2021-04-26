from django.db import models
from api.category.models import Category
from django.core.validators import MinValueValidator
# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    price = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    stock = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    is_active = models.BooleanField(default=True, blank=True)
    image = models.ImageField(upload_to="images/",blank=True,null=True)
    category = models.ForeignKey(Category,on_delete=models.SET_NULL,blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"
