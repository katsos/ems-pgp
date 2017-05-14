from oauth2client import client, crypt
from oauth2client.crypt import AppIdentityError

from app.database import db
from app.models.user import User
from app.models.google_user import GoogleUser

CLIENT_ID = "976520229359-f2v2c0th5uoa1nd7p1aiij364tjp7uqj.apps.googleusercontent.com"


def get_user(email):
    return User.query.filter(User.email == email).first()


def get_google_user_data(token):
    try:
        info = client.verify_id_token(token, CLIENT_ID)

        if info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise AppIdentityError("Wrong issuer.")

        return info
    except AppIdentityError:
        return None
