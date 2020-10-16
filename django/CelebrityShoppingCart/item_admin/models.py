from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=20, blank=True, default='')
    imgUrl = models.ImageField(upload_to='img/', null=True)
    price = models.PositiveIntegerField(blank=True, default=0)
    count = models.PositiveIntegerField(blank=True, default=0)
    amount = models.PositiveIntegerField(blank=True, default=0)

    def __str__(self):
        return self.name
