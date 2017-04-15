def data_is_valid(data, required_fields):
    for field in required_fields:
        if not data[field]:
            return False
    return True
