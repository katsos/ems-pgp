from flask import render_template
from flask_login import login_required

from app.auth.views import auth
from app.api import api_programs_blueprint


def route(app):
    app.register_blueprint(api_programs_blueprint, url_prefix='/api/programs')
    app.register_blueprint(auth, url_prefix='/auth/')

    @app.route('/login', methods=['GET'])
    def login():
        return render_template('login.html')

    # Serve frontend app
    @app.route('/', methods=['GET'])
    @app.route('/<path:ignored>', methods=['GET'])
    @login_required
    def index(ignored=None):
        return render_template('index.html')
