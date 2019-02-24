# Script to create dummy data for course graph
# 
# example of data structure from Bryan:
#
# {
# "depart": "department tag (like CS)",
# "id": "course id with just the number, like 465",
# "name": "course name",
# "desc": "course description",
# "cred": "amount of course credits",
# "p": "true/false" [depending on if the course has P at the end of its ID, this will be cs only]
# "pre": an array of departments and their IDs like ['CS 202', 'CS 465P']
# }
import json
import string
from random import randint, choice

NUM_COURSES = 80
OUT_FILE = 'dummy_data.json'

data = {}
data['courses'] = []
departs = ['CS', 'MATH']
courses = []
n_courses = 0

for i in range(0, NUM_COURSES):
    # course numbers in order so prereqs make sense
    if i <= NUM_COURSES/4: num = randint(100, 199)
    elif i <= NUM_COURSES/3: num = randint(200, 299)
    elif i <= NUM_COURSES/2: num = randint(300, 399)
    else: num = randint(400, 499)

    # choose random variables
    depart = departs[randint(0, 1)]
    ID = depart + ' ' + str(num)
    name = ''.join(choice(string.ascii_letters + ' ') for x in range(20))
    desc = ''.join(choice(string.ascii_letters + ' ') for x in range(200))
    cred = randint(1, 4)
    p = True if (depart == 'CS') and (i % 10 == 0) else False
    courses.append(ID)
    n_courses += 1
    pre = []
    n_pre = randint(0, 3)
    for j in range(0, n_pre):
        if n_courses:
            pre.append(courses[randint(0, n_courses-1)])

    # write to object
    data['courses'].append({
        'depart': depart,
        'id': ID,
        'name': name,
        'desc': desc,
        'cred': cred,
        'p': p,
        'pre': pre
    })


with open(OUT_FILE, 'w') as outfile:
    json.dump(data, outfile)

