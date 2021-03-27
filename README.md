# MyBooks

Simple application for managing your books

## Heroku application

<https://ancient-sea-56816.herokuapp.com>

## REST API

## Get all books

```bash
http http://127.0.0.1:8000/api/books
```

## Add a new book

```bash
http POST http://127.0.0.1:8000/api/books author='John' title='Island' language='en'
```

## Filter books

```bash
http http://127.0.0.1:8000/api/books?title=John&language=en&pub_date=2015-2020
```

## Delete a book with an id

```bash
http DELETE http://127.0.0.1:8000/api/books/1
```
