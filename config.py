from app.database import Database

DEBUG = True

# mysql://username:password@server/db
SQLALCHEMY_DATABASE_URI = Database.dbms + '://' + Database.username + ':' + Database.password \
        + '@' + Database.host + '/' + Database.db_name
SQLALCHEMY_ECHO = True
SQLALCHEMY_TRACK_MODIFICATIONS = False
