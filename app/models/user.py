from app.database import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True)

    google_user = db.relationship('GoogleUser', uselist=False)
    programs = db.relationship('Program', backref='user')

    def __repr__(self):
        return '<User %r>' % self.email
