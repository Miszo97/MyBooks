from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    isbn_number = models.CharField(max_length=15)
    page_count = models.IntegerField()
    thumbnail = models.URLField()
    language = models.CharField(max_length=10)
