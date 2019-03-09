# PSU Course Visualization Tool
This is a fullstack web app which uses React and Django. Data about courses at Portland State University is scraped from PSU's website. Django then creates a REST API for the React frontend to get this data from. The data is used to create an interactive course dependency graph using d3.
<br>
### Backend Setup
Navigate to the backend directory and create a python environment of your choice. For example:

```
cd backend
virtualenv venv
source venv/bin/activate
```

<br>
Then install all the required python packages. These are in requirements.txt:

```
pip install -r requirements.txt
```

<br>
Now navigate to the courses_api Django project and create a superuser:

```
cd courses_api
python manage.py migrate
python manage.py createsuperuser
python manage.py makemigrations coursegraph
python manage.py migrate
```

Run the webscraper populate sqlite database with course data from PSU's website (this will take a while):

```
cd ../
python web_scraper.py
```

<br>
Now you can start the server:

```
cd courses_api
python manage.py runserver
```

<br>
The Django API is now running on port 8000 and you can start the frontend.
<br><br>

### Frontend Setup
