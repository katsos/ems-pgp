from flask import abort, Blueprint, request, redirect, url_for
from flask_login import login_user, logout_user
from jsonschema import validate, ValidationError

from .schemas import login_schema
from .controllers import get_user, get_google_user_data

auth = Blueprint('auth', __name__)


@auth.route('login', methods=['POST'])
def login():
    request_data = request.get_json()

    try:
        validate(request_data, login_schema)
    except ValidationError:
        abort(422)  # Unprocessable Entity

    email = request_data['email']
    token = request_data['token']

    user = get_user(email)

    if user is None:
        abort(400, 'The email your provided isn\'t valid.')  # bad request

    google_user_data = get_google_user_data(token)

    if google_user_data is None:
        abort(400, 'Google\'s token integrity test failed.')  # bad request

    if not user.set_google_user(google_user_data, token):
        abort(500, 'There was a problem storing user\'s data in database')

    login_user(user)
    return redirect(url_for(''))


@auth.route('logout', methods=['POST'])
def logout():
    logout_user()
    return redirect(url_for('login'))
