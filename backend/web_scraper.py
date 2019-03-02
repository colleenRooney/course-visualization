#!./venv/bin/python3
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
import time
import unicodedata
import csv

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

def get_data(page, math=False):
    data = {}
    data['courses'] = []
    course = []
    soup = BeautifulSoup(page, 'html.parser')
    cid = soup.find_all('h1')
    for c in cid:
        print(c.get_text())
        course.append(c.get_text().strip().replace(',', ''))
    if not math:
        tags = soup.find_all('tr')

        for t in tags:
            text = t.get_text()
            entries = text.split(':')
            if str(entries[0]) == 'Credit Hours':
                course.append(
                    entries[1].strip().replace(',', ''))
            if str(entries[0]) == 'Course Description':
                course.append(
                    entries[1].strip().replace(',', ''))
            if str(entries[0]) == 'Prerequisites':
                course.append(
                    entries[1].strip().replace(',', ''))
    elif math:
        pass
    while len(course) < 4:
        course.append('')
    return course

def traverse_links(links, math=False):
    pre = ''
    if math:
        pre = "http://pdx.smartcatalogiq.com/"
    for li in links:
        link = str(li).split('"')
        page = simple_get(pre + link[1])
        data = get_data(page, math)
        #print(data[0] + "," + data[1] + "," + data[3])


page = simple_get('https://www.pdx.edu/computer-science/cs570')

top_page = simple_get('https://www.pdx.edu/computer-science/graduate-courses')
#top_page = simple_get('http://pdx.smartcatalogiq.com/2018-2019/Bulletin/Courses/Mth-Mathematical-Sciences')

soup = BeautifulSoup(top_page, 'html.parser')
tags = soup.find_all('ul')
links = tags[6].find_all('li')
traverse_links(links, math=False)
