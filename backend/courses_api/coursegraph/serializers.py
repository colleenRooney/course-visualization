from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
                'id',
                'depart',
                'cid',
                'name',
                'desc',
                'cred',
                'pre',
                )
        model = Course
