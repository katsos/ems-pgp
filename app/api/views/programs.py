from flask import abort, Blueprint, request, jsonify
from flask.views import MethodView
from jsonschema import validate, ValidationError

from app.models import Program
from app.api.controllers import add_program, get_all_programs


class ProgramAPI(MethodView):
    @staticmethod
    def get(id):

        # TODO: add session authentication, if user has the right to see this list

        programs = get_all_programs()

        return jsonify(programs=Program.list_to_json(programs))

    @staticmethod
    def post(id):
        request_data = request.get_json()

        try:
            validate(request_data, post_schema)
        except ValidationError:
            abort(422)  # Unprocessable Entity

        title = request_data['title']
        year = request_data['year']

        # TODO: restriction on title-year
        program = add_program(title, year)

        return jsonify(
            id=program.id,
            title=program.title,
            year=program.year,
            creation_date=str(program.creation_date),
        )

programs_view = ProgramAPI.as_view('user_api')

programs_blueprint = Blueprint('apo.programs', __name__)
# TODO: add restriction - only secretary can see the programs api

programs_blueprint.add_url_rule('', defaults={'id': None},
                                view_func=programs_view, methods=['GET', 'POST'])


post_schema = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "year": {"type": "number"}
    },
    "required": ["title", "year"]
}
