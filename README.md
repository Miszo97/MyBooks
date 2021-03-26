# MyBooks
Simple application for managing your books

### heroku
https://ancient-sea-56816.herokuapp.com


### REST API

## Get all books
```
http http://127.0.0.1:8000/api/books
```
## Add a new book
```
http POST http://127.0.0.1:8000/api/books author='John' title='Island' language='en'
```
## Filter books
```
http http://127.0.0.1:8000/api/books?title=John&language=en&pub_date=2015-2020
```
## Delete a book with id
```
http DELETE http://127.0.0.1:8000/api/books/1
```
