from flask import abort, Blueprint, request, jsonify
from jsonschema import validate, ValidationError

from app.models import Program
from app.api.controllers import add_program, get_all_programs

programs_bp = Blueprint('programs', __name__)


@programs_bp.route('', methods=['GET'])
def get():
    # TODO: add session authentication, if user has the right to see this list

    state = request.args.get('state')
    programs = get_all_programs(state)

    return jsonify(programs=Program.list_to_json(programs))


@programs_bp.route('<int:id>', methods=['POST'])
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


post_schema = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "year": {"type": "number"}
    },
    "required": ["title", "year"]
}
