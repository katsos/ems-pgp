from flask import abort, jsonify, Blueprint, request
from jsonschema import validate, ValidationError

from app.utils import is_json
from .schemas import login_schema
from .controllers import user_exists, get_google_user_data, import_update_user_data

auth = Blueprint('auth', __name__)
auth.before_request(is_json)


@auth.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()

    try:
        validate(request_data, login_schema)
    except ValidationError:
        abort(422)  # Unprocessable Entity

    email = request_data['email']
    token = request_data['token']

    if not user_exists(email):
        abort(400, 'The email your provided isn\'t valid.')  # bad request

    google_user_data = get_google_user_data(token)

    if not google_user_data:
        abort(400, 'Google\'s token integrity test failed.')  # bad request

    if not import_update_user_data(google_user_data, token):
        abort(500, 'There was a problem storing user\'s data in database')

    return jsonify({'user': google_user_data})


@auth.route('/logout', methods=['POST'])
def logout():
    return 'logout'
