## Installation
For the installation of the app, an Ubuntu 18 server is recommended.

1. Install [Python](https://www.python.org/downloads/) 3.6 or later
2. Install [pip](https://pip.pypa.io/en/stable/installing/)
(it comes bundled with Python by default)
3. Install [virtualenv](https://virtualenv.pypa.io/en/stable/installation/)
4. Install [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/)
(recommended)
5. Install client and server instances of [PostgreSQL](https://www.postgresql.org/download/) version 10 or later
You can follow [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04).
6. Create a database dedicated for the app
7. Create a python virtual enviroment for the app
8. Create `/config/settings/production.json` and give parameters as described in the following schema
```json
  {
    "HOST": "xxx.xxx.xxx.xxx",
    "DB_USER": "DB_USER",
    "DB_PASS": "SUPER_HARD_PASS",
    "STATIC_ROOT": "/var/www/static"
  }
```
9. Install [nvm](https://github.com/creationix/nvm#installation)
10. Install [yarn](https://yarnpkg.com/en/docs/install) by executing `npm i -g yarn`

## Update version
1. Fetch last changes `git pull`
2. Activate the virtual environment `workon emspgp`
3. Update python dependencies `pip install -r requirements.txt`
4. Update the database ./manage.py migrate
5. Activate the node environment `nvm use`
6. Install javascript dependencies `yarn instal`
7. Bundle front-end files `yarn build`
8. Bundle all static files and send them to STATIC_ROOT folder
`./manage.py collectstatic`

## Go Live on production server
1. Execute `gunicorn config.wsgi --bind 127.0.0.1:9010`

2. Make sure to set a web server to proxy the gunicorn port
```nginx
server {
  listen 9000;
  server_name xxx.xxx.xxx.xxx;


	access_log /path_to/emspgp/logs/nginx_access.log;
	error_log  /path_to/emspgp/logs/nginx_error.log;

	location /static {
    		root /path_to/emspgp/static;
	}

	location / {
    		proxy_pass http://127.0.0.1:9010;
	}
}
```

## Development
1. Continuously build front-end files `yarn start` (keep terminal open)
2. Run server `./manage.py runserver --settings=config.settings.development`
