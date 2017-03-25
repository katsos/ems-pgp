from django.db import models


class Student(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=98)
    surname = models.CharField(max_length=98)
    email = models.CharField(max_length=98)
    address = models.TextField(null=True)
    created = models.DateTimeField(auto_now_add=True)
