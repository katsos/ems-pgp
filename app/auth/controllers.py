def is_user_authenticated(request_data):
    response = {}

    if True:
        response['token'] = '1234'
    else:
        response['error'] = 'blah blah'

    return response
