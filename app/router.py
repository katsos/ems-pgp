from flask import abort, request, render_template

from app.auth.views import auth


def route(app):
    app.register_blueprint(auth, url_prefix='/auth')

    # Serve frontend app
    @app.route('/', methods=['GET'])
    @app.route('/<path:path>', methods=['GET'])
    def index(path=None):
        return render_template('index.html')
