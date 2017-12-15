DEBUG = True
SECRET_KEY = 'super duper secret'

DATABASE = dict(
    dbms='mysql',
    username='root',
    password='root',
    host='localhost',
    db_name='thesis'
)

# mysql://username:password@server/db
SQLALCHEMY_DATABASE_URI = DATABASE['dbms'] + '://' + DATABASE['username'] + ':' + DATABASE['password'] \
                          + '@' + DATABASE['host'] + '/' + DATABASE['db_name']
SQLALCHEMY_ECHO = True
SQLALCHEMY_TRACK_MODIFICATIONS = False
