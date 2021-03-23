from django.urls import path

from my_books_frontend.views import index

app_name = 'my_books_frontend'


urlpatterns = [
    path('', index, name='index')
]
