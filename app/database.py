import sys, pymysql
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Database():
    dbms = 'mysql'
    username = 'root'
    password = ''
    host = 'localhost'
    db_name = 'thesis'

    @staticmethod
    def check_connection():
        try:
            db = pymysql.connect(
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
        except pymysql.Error as error:
            print("Database connection failed with error " + str(error))
            sys.exit(1)
