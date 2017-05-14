from app.database import db


class GoogleUser(db.Model):
    fullname = db.Column(db.String(128))
    email = db.Column(db.String(128), db.ForeignKey('user.email'), primary_key=True)
    email_verified = db.Column(db.Boolean)
    token = db.Column(db.String(2048))
    image_url = db.Column(db.String(1024))

    def __init__(self, fullname, email, email_verified, token, image_url):
        self.fullname = fullname
        self.email = email
        self.email_verified = email_verified
        self.token = token
        self.image_url = image_url

    def __setitem__(self, key, value):
        self.__dict__[key] = value

    def __repr__(self):
        return '<GoogleUser %r>' % self.email
