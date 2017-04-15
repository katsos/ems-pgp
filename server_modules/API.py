from flask_restful import Resource


class API(Resource):
    def get(self):
        return {'api': True}