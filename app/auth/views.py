from flask import abort, jsonify, Blueprint, request

from app.utils import data_is_valid
from .controllers import is_user_authenticated

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()

    if not data_is_valid(request_data, ['username', 'password']):
        abort(422) # Unprocessable Entity

    response = is_user_authenticated(request_data)
    response_json = jsonify(response)
    return response_json if response['token'] else abort(400, response_json)


@auth.route('/logout', methods=['POST'])
def logout():
    return 'logout'
