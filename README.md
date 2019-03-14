# PSU Course Visualization Tool
This is a fullstack web app which uses React and Django. Data about the courses offered at Portland State University is scraped from PSU's website and added to a sqlite database. Django creates a REST API for the React frontend to get this data from. The data is used to create an interactive course dependency graph using d3. <br><br>
*Currently there are two implementations of the course graph.*
#### master

The implementation on branch master has a graph with full functionality without forces.
![master graph](https://raw.githubusercontent.com/colleenRooney/course-visualization/master/static.png)
#### forces
The implementation on branch forces has a graph missing highlighting functionality, recursive prequisite functionality, and text display functionality. It has been refactored to use d3 force simulations.
![forces graph](https://raw.githubusercontent.com/colleenRooney/course-visualization/master/forces.png)
<br>
## Run Locally
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
<br>
The frontend was created with create-react-app. To start the frontend first install all npm packages

```
cd frontend
npm install
```

Then with the django API running on the defualt port 8000 start the frontend

```
npm start
```

