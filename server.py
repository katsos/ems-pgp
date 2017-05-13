#!/usr/bin/env python

import pymysql
from flask_script import Manager, Shell
from flask_migrate import Migrate, MigrateCommand

from app import app
from app.database import db
from app.models import *


def make_shell_context():
    return dict(
        app=app,
        db=db,
        GoogleUser=GoogleUser,
        Program=Program,
        Student=Student,
        User=User,
    )

pymysql.install_as_MySQLdb()
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)
manager.add_command("shell", Shell(make_context=make_shell_context))

if __name__ == "__main__":
    manager.run()

