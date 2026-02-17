from django.urls import path
from .views import hello,home

urlpatterns = [
    path('message/', home),
    path('hello/', hello),
]
