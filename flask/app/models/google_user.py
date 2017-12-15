from app.database import db


class GoogleUser(db.Model):
    fullname = db.Column(db.String(128))
    email = db.Column(db.String(128), db.ForeignKey('user.email'), primary_key=True)
    email_verified = db.Column(db.Boolean)
    token = db.Column(db.String(2048))
    image_url = db.Column(db.String(1024))

    def __init__(self, email):
        self.email = email

    def __repr__(self):
        return '<GoogleUser %r>' % self.email

    def to_json(self):
        return {
            'fullname': self.fullname,
            'email_verified': self.email_verified,
            'token': self.token,
            'image_url': self.image_url
        }
