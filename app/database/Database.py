import sys, MySQLdb
from flask_sqlalchemy import SQLAlchemy


class Database():
    _instance = None
    dbms = 'mysql'
    username = 'root'
    password = ''
    host = 'localhost'
    db_name = 'thesis'

    def __init__(self, app):
        if Database._instance is not None:
            return
        self.app = app
        self._config()
        self._check_connection()
        Database._instance = SQLAlchemy(app)

    def _config(self):
        # mysql://username:password@server/db
        self.app.config['SQLALCHEMY_DATABASE_URI'] = Database.dbms \
                + '://' + Database.username + ':' + Database.password \
                + '@' + Database.host + '/' + Database.db_name
        self.app.config['SQLALCHEMY_ECHO'] = True
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    @staticmethod
    def _check_connection():
        try:
            db = MySQLdb.connect(
                Database.host,
                Database.username,
                Database.password,
                Database.db_name
            )
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

    @staticmethod
    def get_instance(app):
        if Database._instance is None:
            Database(app)
        return Database._instance
