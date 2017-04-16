from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from app.router import route
from app.database import Database

PUBLIC_FOLDER = '../public'

app = Flask(
    __name__,
    static_url_path='', # request files inside of static folder without prefixes
    static_folder=PUBLIC_FOLDER
)
app.config.from_object('config')

db = SQLAlchemy(app)
Database.check_connection()

from app.models import *
db.create_all() # migrate db schema

route(app)
