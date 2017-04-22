from flask import abort, jsonify, Blueprint, request

from app.utils import data_is_valid, is_json
from .controllers import user_exists, get_google_user_data, import_update_user_data

auth = Blueprint('auth', __name__)
auth.before_request(is_json)


@auth.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()

    if not data_is_valid(request_data, ['email', 'token']):
        abort(422)  # Unprocessable Entity

    email = request_data['email']
    token = request_data['token']

    if not user_exists(email):
        abort(400)  # bad request

    google_user_data = get_google_user_data(token)

    if not google_user_data:
        abort(400)  # bad request

    if not import_update_user_data(google_user_data, token):
        abort(500, 'There was a problem storing user\'s data in database')

    return jsonify({'user': google_user_data})


@auth.route('/logout', methods=['POST'])
def logout():
    return 'logout'
