from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import ReportViewSet,CustomUserViewSet

router = routers.DefaultRouter()
router.register('report',ReportViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('customuser/',CustomUserViewSet.as_view()),
]
