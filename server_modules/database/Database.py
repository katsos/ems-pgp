import sys, MySQLdb
from flask_sqlalchemy import SQLAlchemy

db = None


def init(app):
    __config(app)
    __check_connection()
    global db
    db = SQLAlchemy(app)


def __config(app):
    dbms = 'mysql'
    username = 'root'
    password = ''
    host = 'localhost'
    db_name = 'thesis'

    # mysql://username:password@server/db
    app.config['SQLALCHEMY_DATABASE_URI'] = dbms + '://' + username + ':' + password + '@' + host + '/' + db_name
    app.config['SQLALCHEMY_ECHO'] = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


def __check_connection():
    try:
        username = 'root'
        password = ''
        host = 'localhost'
        db_name = 'thesis'

        db = MySQLdb.connect(host, username, password, db_name)
        cursor = db.cursor()
        cursor.execute("SELECT VERSION()")
        results = cursor.fetchone()

        if results:
            print("Database connection successful!")
        else:
            print("Database connection failed!")
    except MySQLdb.Error as error:
        print("Database connection failed with error " + str(error))
        sys.exit(1)

