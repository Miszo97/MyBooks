from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def index(request, *args, **kwargs):
    return render(request, "my_books_frontend/index.html")
