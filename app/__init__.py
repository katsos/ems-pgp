from flask import Flask
from flask_migrate import Migrate

from app.router import route
from app.database import Database, db

PUBLIC_FOLDER = '../public'

app = Flask(
    __name__,
    static_url_path='', # request files inside of static folder without prefixes
    static_folder=PUBLIC_FOLDER
)
app.config.from_object('config')

Database.check_connection()
db.init_app(app)
migrate = Migrate(app, db)

from app.models import *
route(app)
