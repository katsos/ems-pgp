import sys, pymysql
from flask_sqlalchemy import SQLAlchemy

from config import DATABASE as config

db = SQLAlchemy()


class Database:

    @staticmethod
    def check_connection():
        try:
            db = pymysql.connect(
                config['host'],
                config['username'],
                config['password'],
                config['db_name']
            )
            cursor = db.cursor()
            cursor.execute("SELECT VERSION()")
            results = cursor.fetchone()

            if results:
                print("Database connection successful!")
            else:
                print("Database connection failed!")
        except pymysql.Error as error:
            print("Database connection failed with error " + str(error))
            sys.exit(1)
