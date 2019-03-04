from django.shortcuts import render
from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer

class ListCourse(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class DetailCourse(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
