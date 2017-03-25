## Economics Management System for PostGraduate Programs

### Install for development  
1. Create python's virtual enviroment
    1. `virtualenv .venv`
    2. `source ./.venv/bin/activate`
    3. `pip install -r ./requirements.txt`
2. Create database
    1. `cd ./_root`
    2. `./manage.py makemigrations`
    3. `./manage.py migrate`
3. Create node enviroment running: `yarn install`

### Run for development
1. `npm start`
2. `cd ./_root`
3. `./manage.py runserver`
