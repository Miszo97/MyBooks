
from django.test import TestCase
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient

from my_books_api.models import Book


def create_a_book():
    pub_date = timezone.now()
    thumbnail_url = "http://books.google.com/books/content?id=DqLPAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    book = {
        'title': 'Hobbit',
        'author': 'J. R. R. Tolkien',
        'pub_date': pub_date,
        'isbn_number': "0001235679345",
        'page_count': 123,
        'thumbnail': thumbnail_url,
        'language': 'en'
    }
    return book


class BooksViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_all_books(self):
        res = self.client.get('/api/books')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_add_new_book(self):
        book = create_a_book()
        res = self.client.post('/api/books', book, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)


class BookViewDetail(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_book_detail(self):
        Book.objects.create(*create_a_book())

        res = self.client.get('/api/books/1')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_book(self):
        Book.objects.create(*create_a_book())

        res = self.client.delete('/api/books/1')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(Book.objects.count(), 0)

    def test_edit_book(self):
        Book.objects.create(*create_a_book())
        changes = {'page_count': 100}
        res = self.client.patch('/api/books/1', changes, format='json')

        book = Book.objects.get(pk=1)

        self.assertEqual(res.status_code, status.status.HTTP_200_OK)
        self.assertEqual(book.page_count, 100)
