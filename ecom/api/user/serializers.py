from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import datetime,timedelta
from django.conf import settings


class CustomJWTSerializer(TokenObtainPairSerializer):
    """ CUSTOM SERIALIZER FOR RETURNING CUSTOM INFO IN FUTURE """
    def validate(self, attrs):
        data = super().validate(attrs)
        # returning additional info like access & refresh token valid till
        current_time = datetime.now()
        data['access_validity'] = str(current_time + settings.SIMPLE_JWT.get('ACCESS_TOKEN_LIFETIME'))
        data['refresh_validity'] = str(current_time + settings.SIMPLE_JWT.get('REFRESH_TOKEN_LIFETIME'))
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        extra_kwargs = {'password': {
            'write_only': True
        }}
        fields = ['name','email','password','phone','gender']

    def create(self, validated_data):
        """ USED FOR CREATING USER OBJECT """

        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        # Create object can also be written as CustomUser(**validated_data)

        if password:
            # sets password (hashed)
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        """ used to update user data """

        for attr,value in validated_data.items():
            if attr == "password":
                instance.set_password(value)
            else:
                setattr(instance,attr,value)
        
        instance.save()
        return instance
