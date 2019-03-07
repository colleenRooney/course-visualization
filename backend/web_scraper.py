# Web scraping script to get data for course graph
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
#
# WORK IN PROGRESS
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
import itertools
import bs4
import time
import json
import re
import os
import sys
import django

# all of this nonsense should eventually be in manage.py
script_path = os.path.dirname(__file__)
project_dir = os.path.abspath(os.path.join(script_path, 'courses_api'))
sys.path.insert(0, project_dir)
os.environ['DJANGO_SETTINGS_MODULE']='courses_api.settings'
django.setup()

from coursegraph.models import Course
from django.contrib.auth.models import User

users = User.objects.all()
OUT_FILE = 'scraped_data.json'
LABELED_COURSE_RE = re.compile("(?:CS|MA{0,1}TH|STATS{0,1}) {0,1}[0-6][\d][\d]", re.IGNORECASE)


def normalize_depart(depart):
    depart.strip().upper()
    if depart.startswith('M'):
        return 'MTH'
    elif depart.startswith('STAT'):
        return 'STAT'
    elif depart.startswith('C'):
        return 'CS'
    else:
        return depart

def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML,
    return the text content, otherwise return None.
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None

    except RequestException as e:
        log_error('Error during requests to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns True if the response seems to be HTML, False otherwise.
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


def log_error(e):
    """
    Make this do something useful
    """
    print(e)

def get_data(page, data, math=False):
    soup = BeautifulSoup(page, 'html.parser')
    cid = soup.find_all('h1')

    # initalize data to false
    depart = None
    ID = None
    name = None
    desc = None
    credits = None
    preq = []
    P = None

    for c in cid:
        course_split = c.get_text().split(' ')
        depart = course_split[0]
        ID = course_split[1]

        # temp, need to hadnle both courses
        if len(ID) > 4:
            ID = course_split[1].split('/')[1]
        ID = int(''.join(filter(str.isdigit, ID)))
        name = (' ').join(course_split[2:])

    # hacky
    if not math:
        tags = soup.find_all('tr')

        for t in tags:
            text = t.get_text()
            entries = text.split(':')
            if str(entries[0]) == 'Credit Hours':
                credits = entries[1].strip()
                # temp, need to hadnle both courses
                if len(credits) > 1:
                    # edge case, fix
                    if len(entries) > 2:
                        credits = 3
                    else:
                        credits = credits.split('/')[1]
            if str(entries[0]) == 'Course Description':
                desc = entries[1].strip()
            if str(entries[0]) == 'Prerequisites':
                # only accepts explict departmental labeled courses,
                #need some fancy regex to pull other depends
                preq_raw = entries[1].strip()
                labeled_preq = re.findall(LABELED_COURSE_RE, preq_raw)
                for lp in labeled_preq:
                    lp.replace(' ', '')
                preq.extend(labeled_preq)

    elif math:
        desc = soup.find_all('div', {'class': 'desc'})
        credits = soup.find_all('div', {'class': 'credits'})
        desc = desc[0].get_text().strip()
        credits = credits[0].get_text().strip()
        if len(credits) > 2:
            credits = credits.split('-')[1]

        headers = soup.find_all('h3')
        for h in headers:
            if h.get_text().strip() == 'Prerequisite':
                preqs = h.next_siblings
                for p in preqs:
                    if isinstance(p, bs4.element.Tag):
                        clean = ["".join(c) for _, c in itertools.groupby(p.contents[0], key=str.isdigit)]
                        clean = normalize_depart(clean[0]) + ' ' + clean[1].strip()
                        preq.append(clean)

    # Some more data cleaning
    normalize_depart(depart)

    data['courses'].append({
        'depart': depart,
        'cid': ID,
        'name': name,
        'desc': desc,
        'cred': credits,
        'pre': preq
    })

    course = Course(depart=depart, cid=ID, name=name, desc=desc,
            cred=credits, pre=preq)
    course.save()
    return data

def traverse_links(links, data, math=False):
    pre = ''
    if math:
        pre = "http://pdx.smartcatalogiq.com/"
    for li in links:
        link = str(li).split('"')
        page = simple_get(pre + link[1])
        get_data(page, data, math)


data = {}
data['courses'] = []

top_page = simple_get('https://www.pdx.edu/computer-science/graduate-courses')
soup = BeautifulSoup(top_page, 'html.parser')
tags = soup.find_all('ul')
links = tags[6].find_all('li')

traverse_links(links, data, math=False)

top_page = simple_get('http://pdx.smartcatalogiq.com/2018-2019/Bulletin/Courses/Mth-Mathematical-Sciences')
soup = BeautifulSoup(top_page, 'html.parser')
tags = soup.find_all('ul')
links = tags[6].find_all('li')
traverse_links(links, data, math=True)

# to json file
#with open(OUT_FILE, 'w') as outfile:
#    json.dump(data, outfile)
