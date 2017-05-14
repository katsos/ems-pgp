from flask import Flask
from flask_login import LoginManager

from app.router import route
from app.database import Database, db

STATIC_FOLDER = '../public'
STATIC_URL_PATH = '/static'

app = Flask(
    __name__,
    static_url_path=STATIC_URL_PATH,
    static_folder=STATIC_FOLDER
)
app.config.from_object('config')

Database.check_connection()
db.init_app(app)

login_manager = LoginManager(app)
login_manager.session_protection = 'strong'
login_manager.login_view = 'login'

from app.models import *

route(app)
