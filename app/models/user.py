from sqlalchemy.orm import relationship

from app.database import db


class User(db.Model):
    __tablename__ = 'users'
    email = db.Column(db.String(128), primary_key=True)
    google_user = relationship('Google_User', uselist=False)

    def __init__(self, email):
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.email
