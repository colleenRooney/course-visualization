from django.test import TestCase
from .models import Course

class ClassModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Course.objects.create(depart="CS", 
                cid="101",
                name="intro to computers",
                desc="you learn some things",
                cred="4"
            )

        # this is working for some reason...
        def test_depart_content(self):
            course = Course.objects.get(id=1)
            expected_object_name = f'{course.depart}'
            self.assertEquals(expected_object_name, 'MATH')
