from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# "depart": "department tag (like CS)",
# "cid": "course id with just the number, like 465",
# "name": "course name",
# "desc": "course description",
# "cred": "amount of course credits",
# "p": "true/false" [depending on if the course has P at the end of its ID, this will be cs only]
# "pre": an array of departments and their IDs like ['CS 202', 'CS 465P']

class Course(models.Model):
    depart = models.CharField(max_length=10, null=False, blank=False)
    cid = models.IntegerField(validators=[MinValueValidator(100),
                               MaxValueValidator(699)])
    name = models.CharField(max_length=40, null=False, blank=False)
    desc = models.CharField(max_length=5000, null=True, blank=True)
    cred = models.IntegerField(validators=[MinValueValidator(0),
                                MaxValueValidator(6)])

    def __str__(self):
        """ return a string representation of the model """
        return self.name

