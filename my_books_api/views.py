from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from my_books_api.models import Book
from my_books_api.serializers import BookSerializer


class BooksView(APIView):
    def get(self, request):
        title = request.GET.get('title', None)
        author = request.GET.get('author', None)
        language = request.GET.get('language', None)
        pub_date = request.GET.get('pub_date', None)

        if title is None and author is None and pub_date is None and language is None:
            books = Book.objects.all()
        else:
            filter_query = {}

            if title is not None:
                filter_query['title__icontains'] = title

            if author is not None:
                filter_query['author__icontains'] = author

            if language is not None:
                filter_query['language'] = language

            if pub_date is not None:
                if '-' in pub_date:
                    from_year, to_year = pub_date.split('-')
                    filter_query['pub_date__lte'] = to_year
                    filter_query['pub_date__gte'] = from_year
                else:
                    filter_query['pub_date'] = pub_date

            books = Book.objects.filter(**filter_query)

        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, requset):
        serializer = BookSerializer(data=requset.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BooksDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
