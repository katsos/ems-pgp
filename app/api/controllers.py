from app.models import Program
from app.database import db


def add_program(title, year):
    program = Program(title, year)
    db.session.add(program)
    db.session.commit()
    return program


def get_all_programs(state):
    if state is None:
        return Program.query.all()

    if state == 'active':
        return Program.query.filter(Program.end_date is not None).all()

    if state == 'finished':
        return Program.query.filter(Program.end_date is None).all()
