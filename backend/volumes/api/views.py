from .models import Report
from .serializers import ReportSerializer
from rest_framework import viewsets

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
