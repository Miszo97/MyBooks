from my_books_api.models import Book


def create_a_book(title='Hobbit',
                  author='J. R. R. Tolkien',
                  pub_date=2017,
                  isbn_number='0001235679345',
                  page_count=123,
                  thumbnail="http://books.google.com/books/content?id=DqLPAAAAMAAJ&printsec=frontcover&img=1&zoom=1&skurce=gbs_api",
                  language='en'):

    book = Book.objects.create(title=title, author=author, pub_date=pub_date,
                               isbn_number=isbn_number, page_count=page_count,
                               thumbnail=thumbnail, language=language)
    return book


example_book = {
    'title': 'Hobbit',
    'author': 'J. R. R. Tolkien',
    'pub_date': 2017,
    'isbn_number': '0001235679345',
    'page_count': 123,
    'thumbnail': "http://books.google.com/books/content?id=DqLPAAAAMAAJ&printsec=frontcover&img=1&zoom=1&skurce=gbs_api",
    'language': 'en'
}
