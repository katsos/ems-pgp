from app.database import db


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)

    program_id = db.Column(db.ForeignKey('program.id'))

    def __repr__(self):
        return '<Student %r>' % self.id

    def to_json(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'program_id': self.program_id
        }
