from sqlalchemy import func

from app.database import db


class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(256), nullable=False)
    year = db.Column(db.SmallInteger)

    creation_date = db.Column(db.DateTime, default=func.now())
    last_update_date = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    end_date = db.Column(db.DateTime)

    admin_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    students = db.relationship('Student', backref='program')

    __table_args__ = (
        db.UniqueConstraint('title', 'year', name='program_title_year'),
    )

    def __init__(self, title, year):
        self.title = title
        self.year = year

    def __repr__(self):
        return '<Program %r>' % self.id

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'year': self.year,
            'students': [student.to_json() for student in self.students]
        }

    @staticmethod
    def list_to_json(programs):
        return [p.to_json() for p in programs]
