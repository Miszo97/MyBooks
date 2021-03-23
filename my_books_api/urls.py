from django.urls import path

from my_books_api.views import BooksView

app_name = 'my_books_api'


urlpatterns = [
    path('books', BooksView.as_view(), name='books')
]
