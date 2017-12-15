from flask import Blueprint, request, jsonify
from app.models import User

users_bp = Blueprint('users', __name__)


@users_bp.route('', methods=['GET'])
def get():
    email = request.args.get('email')

    if email is None:
        return jsonify(get_all_to_json())

    user = User.query.filter(User.email == email).first()
    return jsonify(user.to_json())


def get_all_to_json():
    _users = User.query.all()
    users_to_json = []

    for user in _users:
        users_to_json.append(user.to_json())

    return users_to_json
