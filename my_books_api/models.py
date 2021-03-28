from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200, blank=True)
    pub_date = models.IntegerField(null=True)
    isbn_number = models.CharField(max_length=15, blank=True)
    page_count = models.IntegerField(null=True)
    thumbnail = models.URLField(blank=True)
    language = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return f'{self.title} -- {self.author} -- {self.pub_date}'
