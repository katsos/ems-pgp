from app.database import db


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)

    program_id = db.Column(db.Integer, db.ForeignKey('program.id'))

    def __repr__(self):
        return '<Student %r>' % self.id
