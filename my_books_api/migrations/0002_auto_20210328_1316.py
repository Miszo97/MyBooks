# Generated by Django 3.1.7 on 2021-03-28 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_books_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='language',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]
