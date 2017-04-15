from flask import Flask

from server_modules.router import route
from server_modules.database import Database

app = Flask(__name__, static_url_path='')

Database.init(app)
Database.db.create_all()
route(app)

if __name__ == "__main__":
    app.run(debug=True)