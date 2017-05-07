from flask import Blueprint
from flask.views import MethodView


class ProgramAPI(MethodView):
    def get(self, id):
        return '{ \'errors\': [] }'

    def post(self):
        # create a new user
        pass

    def delete(self, user_id):
        # delete a single user
        pass

    def put(self, user_id):
        # update a single user
        pass


programs_view = ProgramAPI.as_view('user_api')

programs_blueprint = Blueprint('apo.programs', __name__)

programs_blueprint.add_url_rule('', defaults={'id': None},
                 view_func=programs_view, methods=['GET'])
