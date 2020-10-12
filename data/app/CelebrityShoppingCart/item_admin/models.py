from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=20, null=False)
    imgUrl = models.CharField(max_length=255, blank=True, default='')
    price = models.PositiveIntegerField(blank=True, default=0)
    count = models.PositiveIntegerField(blank=True, default=0)
    amount = models.PositiveIntegerField(blank=True, default=0)

    def __str__(self):
        return self.name
