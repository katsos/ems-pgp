from flask import Blueprint

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login():
    return 'login'


@auth.route('/logout', methods=['POST'])
def logout():
    return 'logout'
