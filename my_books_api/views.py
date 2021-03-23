from django.http.response import Http404, JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from my_books_api.models import Book
from my_books_api.serializers import BookSerializer


class BooksView(APIView):
    def get(self, request):

        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, requset):
        serializer = BookSerializer(data=requset.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BooksDetailView(APIView):
    def get(self, request, id):
        try:
            return Book.objects.get(id)
        except Book.DoesNotExist:
            raise Http404

    def delete(self, request, id):
        try:
            book = Book.objects.get(id)
        except Book.DoesNotExist:
            raise Http404

        serializer = BookSerializer(book)
        book.delete()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, id):
        book = self.get_object(id)
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(data=serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(data="wrong parameters", status=status.HTTP_400_BAD_REQUEST)
