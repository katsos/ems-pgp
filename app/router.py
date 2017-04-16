from flask import render_template

from app.auth.views import auth


def route(app):
    app.register_blueprint(auth, url_prefix='/auth')

    # Serve frontend app
    @app.route('/', methods=['GET'])
    @app.route('/<path:ignored>', methods=['GET'])
    def index(ignored=None):
        return render_template('index.html')
