from flask import abort, Blueprint, request, jsonify
from jsonschema import validate, ValidationError

from app.models import Program
from app.api.controllers import add_program, get_all_programs

programs_bp = Blueprint('programs', __name__)


@programs_bp.route('', methods=['GET'])
def get_all():
    state = request.args.get('state')
    programs = get_all_programs(state)
    return jsonify(programs=Program.list_to_json(programs))


@programs_bp.route('<int:id>', methods=['GET'])
def get(id):
    program = Program.query.get(id)
    return jsonify(program.to_json())


@programs_bp.route('<int:id>/students', methods=['GET'])
def get_students(id):
    program = Program.query.get(id).to_json()
    students = program['students']
    return jsonify(students)


@programs_bp.route('', methods=['POST'])
def post():
    request_data = request.get_json()

    try:
        validate(request_data, post_schema)
    except ValidationError:
        abort(422)  # Unprocessable Entity

    title = request_data['title']
    year = request_data['year']

    program = add_program(title, year)
    return jsonify(program.to_json())


post_schema = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "year": {"type": "number"}
    },
    "required": ["title", "year"]
}