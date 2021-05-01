from .models import Report,CustomUser
from .serializers import ReportSerializer,CustomUserSerializer
from rest_framework import viewsets,status
from rest_framework.views import APIView
from rest_framework.response import Response

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class CustomUserViewSet(APIView):
    def get_extra_actions():
        return {}
    def get(self,request,format=None):
        usernames = [user.username for user in CustomUser.objects.all()]
        if usernames:
            return Response(usernames,status.HTTP_200_OK)
        else:
            return Response(usernames,status.HTTP_404_NOT_FOUND)
