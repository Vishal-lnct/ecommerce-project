from django.shortcuts import render
from django.http import JsonResponse


def home(request):

   data ={
    'message':'Welcome to E-commerce Store'
}
   return JsonResponse(data)

def hello(request):
   data={
      'message':'hello vishal i am new message'
   }

   return JsonResponse(data)