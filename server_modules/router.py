from flask import render_template
from flask_restful import Api as Rest
from server_modules.API import API


def route(app):
    rest_resources = Rest(app)
    rest_resources.add_resource(API, '/api/')

    @app.route('/', methods=['GET'])
    @app.route('/<path:path>', methods=['GET'])
    def index(path=None):
        return render_template('index.html')
