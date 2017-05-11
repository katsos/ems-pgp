from app.models import Program
from app.database import db


def add_program(title, year):
    program = Program(title, year)
    db.session.add(program)
    db.session.commit()
    return program


def get_all_programs():
    return Program.query.all()
