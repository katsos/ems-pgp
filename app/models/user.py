from sqlalchemy.orm import relationship

from app.database import db


class User(db.Model):
    __tablename__ = 'users'
    email = db.Column(db.String(128), primary_key=True)
    google_user_email = relationship('GoogleUser', uselist=False)

    def __repr__(self):
        return '<User %r>' % self.email
