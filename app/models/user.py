from sqlalchemy.exc import InvalidRequestError

from app.database import db
from app.models.google_user import GoogleUser


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True)

    google_user = db.relationship('GoogleUser', uselist=False)
    programs = db.relationship('Program', backref='user')

    def __repr__(self):
        return '<User %r>' % self.email

    def set_google_user(self, google_user, token):
        if self.google_user is None:
            self.google_user = GoogleUser(email=self.email)

        g = self.google_user
        g.fullname = google_user['name']
        g.email_verified = google_user['email_verified']
        g.image_url = google_user['picture']
        g.token = token

        try:
            db.session.commit()
            return self
        except InvalidRequestError:
            return None
