from flask import abort, request


# TODO: remove this - no needed as long we use jsonschema.validate
def is_json():
    if not request.is_json:
        abort(415) # Unsupported content type
