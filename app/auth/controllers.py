from oauth2client import client, crypt

from app.database import db
from app.models.user import User
from app.models.google_user import GoogleUser

CLIENT_ID = "976520229359-f2v2c0th5uoa1nd7p1aiij364tjp7uqj.apps.googleusercontent.com"


def user_exists(email):
    return True if User.query.get(email) else False


def get_google_user_data(token):
    try:
        info = client.verify_id_token(token, CLIENT_ID)

        if info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise crypt.AppIdentityError("Wrong issuer.")

        print(info)
        return info
    except:
        return None


def import_update_user_data(user, token):
    google_user_exists = GoogleUser.query.get(user['email'])

    return _update_user_data(google_user_exists, user, token) if google_user_exists \
        else _create_user(user, token)


def _create_user(user, token):
    google_user = GoogleUser(
        user['name'],
        user['email'],
        user['email_verified'],
        token,
        user['picture']
    )

    db.session.add(google_user)
    db.session.commit()
    return google_user


def _update_user_data(user, user_updates, token):
    user['fullname'] = user_updates['name']
    user['email_verified'] = user_updates['email_verified']
    user['image_url'] = user_updates['picture']
    user['token'] = token

    db.session.commit()
    return user
