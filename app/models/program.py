from app.database import db


class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Program %r>' % self.id
