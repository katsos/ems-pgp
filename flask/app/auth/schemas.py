login_schema = {
    "type": "object",
    "properties": {
        "email": {"type": "string"},
        "token": {"type": "string"}
    },
    "required": ["email", "token"]
}
