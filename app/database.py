import sys, MySQLdb


class Database():
    dbms = 'mysql'
    username = 'root'
    password = ''
    host = 'localhost'
    db_name = 'thesis'

    @staticmethod
    def check_connection():
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
