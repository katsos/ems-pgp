from flask import Flask

from app.router import route
from app.database.Database import Database

app = Flask(
    __name__,
    static_url_path='', # request files inside of static folder without prefixes
    static_folder='public/static',
    template_folder='public/templates'
)

db = Database.get_instance(app)
route(app)

db.create_all()
