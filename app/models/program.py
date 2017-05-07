from sqlalchemy import func

from app.database import db


class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    year = db.Column(db.SmallInteger)

    creation_date = db.Column(db.DateTime, default=func.now())
    last_update_date = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    end_date = db.Column(db.DateTime)

    admin_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    students = db.relationship('Student', backref='program')

    def __init__(self, title, year):
        self.title = title
        self.year = year

    def __repr__(self):
        return '<Program %r>' % self.id
