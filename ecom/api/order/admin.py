from django.contrib import admin
from .models import Order,OrderInfo
# Register your models here.
admin.site.register([Order,OrderInfo])