from flask import abort, request


def data_is_valid(data, required_fields):
    for field in required_fields:
        if not data[field]:
            return False
    return True


def is_json():
    if not request.is_json:
        abort(415) # Unsupported content type
