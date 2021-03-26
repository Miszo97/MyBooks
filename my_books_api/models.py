from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200, blank=True)
    pub_date = models.PositiveSmallIntegerField()
    isbn_number = models.CharField(max_length=15, blank=True)
    page_count = models.IntegerField(blank=True)
    thumbnail = models.URLField(blank=True)
    language = models.CharField(max_length=10)

    def __str__(self):
        return f'{self.title} -- {self.author} -- {self.pub_date}'
