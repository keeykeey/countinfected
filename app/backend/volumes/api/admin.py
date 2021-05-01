from django.contrib import admin
from .models import Report
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin

admin.site.register(Report)
admin.site.register(CustomUser,UserAdmin)
