from flask import render_template, redirect, url_for, session

from app.api import programs_bp, users_bp
from app.auth.views import auth


def route(app):
    app.register_blueprint(programs_bp, url_prefix='/api/programs/')
    app.register_blueprint(users_bp, url_prefix='/api/users/')
    app.register_blueprint(auth, url_prefix='/auth/')

    @app.route('/login', methods=['GET'])
    def login():
        if session.get('token') is not None:
            redirect(url_for('user'))
        else:
            return render_template('login.html')

    @app.route('/logout', methods=['POST'])
    def logout():
        session.pop('token', None)
        return redirect(url_for('login'))

    # Serve frontend app
    @app.route('/', methods=['GET'])
    @app.route('/<path:ignored>', methods=['GET'])
    def index(ignored=None):
        if session.get('token') is None:
            redirect(url_for('login'))

        return render_template('index.html')
