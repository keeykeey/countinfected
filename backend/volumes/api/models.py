from django.db import models

from django.utils import timezone

class Report(models.Model):
    health_center_options=[
        ('A','保健所A'),
        ('B','保健所B'),
        ('C','保健所C'),
        ('D','保健所D'),
        ('E','保健所E'),
    ]
    health_center = models.CharField(
        max_length=8,
        choices=health_center_options,
        blank = True,
    )
    date = models.DateTimeField(default=timezone.datetime.today())
    number_infected = models.IntegerField()

    def __str__(self):
        return str(self.pk)
