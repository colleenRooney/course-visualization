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
import time
import json

OUT_FILE = 'scraped_data.json'

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

    for c in cid:
        course_split = c.get_text().split(' ')
        depart = course_split[0]
        ID = course_split[1]

        # temp, need to hadnle both courses
        if len(ID) > 3:
            ID = course_split[1].split('/')[1]
        name = (' ').join(course_split[2:])

    # initalize data to false
    depart = None
    ID = None
    name = None
    desc = None
    credits = None
    preq = None
    p = None

    # hacky
    if not math:
        tags = soup.find_all('tr')

        for t in tags:
            text = t.get_text()
            entries = text.split(':')
            if str(entries[0]) == 'Credit Hours':
                credits = entries[1].strip().replace(',', '')
                # temp, need to hadnle both courses
                if len(credits) > 1:
                    # edge case, fix
                    if len(entries) > 2:
                        credits = 3
                    else:
                        credits = credits.split('/')[1]
            if str(entries[0]) == 'Course Description':
                desc = entries[1].strip().replace(',', '')
            if str(entries[0]) == 'Prerequisites':
                # this is going to need some cleaning
                preq = entries[1].strip().replace(',', '')
    elif math:
        pass
    data['courses'].append({
        'depart': depart,
        'id': ID,
        'name': name,
        'desc': desc,
        'cred': credits,
        'p': p,
        'pre': preq
    })
    return data

def traverse_links(links, data, math=False):
    pre = ''
    if math:
        pre = "http://pdx.smartcatalogiq.com/"
    for li in links:
        link = str(li).split('"')
        page = simple_get(pre + link[1])
        get_data(page, data, math)


top_page = simple_get('https://www.pdx.edu/computer-science/graduate-courses')
# MATH - need to implement
#top_page = simple_get('http://pdx.smartcatalogiq.com/2018-2019/Bulletin/Courses/Mth-Mathematical-Sciences')

soup = BeautifulSoup(top_page, 'html.parser')
tags = soup.find_all('ul')
links = tags[6].find_all('li')

data = {}
data['courses'] = []
traverse_links(links, data, math=False)
with open(OUT_FILE, 'w') as outfile:
    json.dump(data, outfile)
