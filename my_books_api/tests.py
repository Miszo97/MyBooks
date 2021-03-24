
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from my_books_api.helpers import create_a_book, example_book
from my_books_api.models import Book
from my_books_api.serializers import BookSerializer


class BooksViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_all_books(self):
        res = self.client.get('/api/books')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_filter_books_with_string_queries_title_many_matching(self):
        book1 = create_a_book(title='Hobbit')
        book2 = create_a_book(title='Hobbit 2')
        book3 = create_a_book(title='This is Hobbit 3')
        create_a_book(title='This is my Hobby')

        res = self.client.get('/api/books?title=Hobbit')

        serializer = BookSerializer([book1, book2, book3], many=True)
        self.assertEqual(res.data, serializer.data)

    def test_filter_books_with_string_queries_author_many_matching(self):
        book1 = create_a_book(title='title 1', author='Jack Ko')
        book2 = create_a_book(title='title 2', author='Jack Koko')
        book3 = create_a_book(title='title 3', author='Jack Koro')
        create_a_book(title='title 3', author='Jammie Koro')

        res = self.client.get('/api/books?author=Jack')

        serializer = BookSerializer([book1, book2, book3], many=True)
        self.assertEqual(res.data, serializer.data)

    def test_filter_books_with_string_queries_language_many_matching(self):
        book1 = create_a_book(title='title 1', author='Jack Ko', language='en')
        book2 = create_a_book(
            title='title 2', author='Jack Koko', language='en')
        create_a_book(title='title 3', author='Jack Koro', language='pl')

        res = self.client.get('/api/books?language=en')
        serializer = BookSerializer([book1, book2], many=True)
        self.assertEqual(res.data, serializer.data)

    def test_filter_books_with_string_queries_pub_date(self):
        book1 = create_a_book(title='title 1', pub_date=2019)
        create_a_book(title='title 2', pub_date=2015)
        create_a_book(title='title 3', pub_date=2012)
        create_a_book(title='title 3', pub_date=2020)

        res = self.client.get('/api/books?pub_date=2019')
        serializer = BookSerializer([book1], many=True)
        self.assertEqual(res.data, serializer.data)

    def test_filter_books_with_string_queries_pub_date_range(self):
        book1 = create_a_book(title='title 1', pub_date=2019)
        book2 = create_a_book(title='title 2', pub_date=2015)
        create_a_book(title='title 3', pub_date=2012)
        create_a_book(title='title 3', pub_date=2020)

        res = self.client.get('/api/books?pub_date=2015-2019')
        serializer = BookSerializer([book1, book2], many=True)
        self.assertEqual(res.data, serializer.data)

    def test_add_new_book(self):
        res = self.client.post(
            '/api/books', example_book, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)


class BookViewDetail(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_book_detail(self):
        create_a_book()

        res = self.client.get('/api/books/1')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_book(self):
        create_a_book()

        res = self.client.delete('/api/books/1')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(Book.objects.count(), 0)

    def test_edit_book(self):
        create_a_book()
        changes = {'page_count': 100}
        res = self.client.patch('/api/books/1', changes, format='json')

        book = Book.objects.get(pk=1)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(book.page_count, 100)
