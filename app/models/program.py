from app.database import db


class Program(db.Model):
    __tablename__ = 'program'
    id = db.Column(db.String(128), primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Program %r>' % self.id
