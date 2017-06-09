# Economics Management System for PostGraduate Programs

## Development
### Dev-Dependencies (aka make sure you have)
* python 3.6+
* mysql 5.7+
* node 6.*
* yarn 0.23+

### Install for development
1. Create python's virtual enviroment
    1. `python -m venv <env-name>` or `virtualenv -p python3 <env-name>`
    2. `source ./<env-name>/bin/activate` for unix systems  
    or `.\<env-name>\Scripts\activate` for Windows machines  
    (you may need to run `Set-ExecutionPolicy Bypass` first)
    3. `pip install -r ./requirements.txt`
2. Initialize database
    4. `./server.py db init`
    5. `./server.py db upgrade`
3. Create node enviroment running: `yarn install`

### Run for development
1. `yarn start`
2. `python server.py`
