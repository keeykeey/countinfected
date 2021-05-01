from rest_framework import serializers
from .models import Report,CustomUser
from rest_framework.validators import UniqueValidator
from django.core.validators import MinLengthValidator
from django.contrib.auth.validators import UnicodeUsernameValidator


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('health_center','date','number_infected')

class CustomUserSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=20,
        validators = [
            UnicodeUsernameValidator(),
            MinLengthValidator(8),
            UniqueValidator(
                queryset=CustomUser.objects.all(),
            )
        ]
    )

    password = serializers.CharField(
        validators = [
            MinLengthValidator(8)
        ]
    )

    class Meta:#Meta情報
        model = CustomUser
        fields = ("username",)
        extra_kwargs = {
            'password':{'write_only':True,'required':True},
        }

    def create(self,validated_data):
        customUser = CustomUser.objects.create_user(**validated_data)
        return customUser

    def update(self,instance,validated_data):
        instance.username = validated_data.get('username',instatnce.username)
        instance.password = validated_data.get('password',instance.password)
        instance.save()
        return instatnce
        











#
