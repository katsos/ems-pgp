#!/usr/bin/env python

import pymysql

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from app import app
from app.database import db

pymysql.install_as_MySQLdb()

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == "__main__":
    manager.run()
