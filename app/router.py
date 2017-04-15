from flask import abort, request, render_template

from app.auth.views import auth


def route(app):
    @app.before_request
    def is_json():
        if not request.is_json:
            abort(415) # Unsupported content type

    app.register_blueprint(auth, url_prefix='/auth')

    # Serve frontend app
    @app.route('/', methods=['GET'])
    @app.route('/<path:path>', methods=['GET'])
    def index(path=None):
        return render_template('index.html')
