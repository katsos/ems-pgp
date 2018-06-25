import json
from django.core.exceptions import ImproperlyConfigured
from django.core.management.utils import get_random_secret_key
from .base import *

SETTINGS_PATH = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(SETTINGS_PATH, 'production.json')) as f:
    prod_variables = json.loads(f.read())


SECRET_KEY = get_random_secret_key()
with open(os.path.join(SETTINGS_PATH, 'SECRET_KEY.txt'), 'w') as f:
    print(SECRET_KEY, file=f)


def get_secret(setting):
    '''Get the secret variable or return explicit exception.'''
    try:
        return prod_variables[setting]
    except KeyError:
        error_msg = 'Set the {0} environment variable'.format(setting)
        raise ImproperlyConfigured(error_msg)


DEBUG = False
ALLOWED_HOSTS = [get_secret('HOST')]
STATIC_ROOT = get_secret('STATIC_ROOT')
DATABASES['default'].update({
    'USER': get_secret('DB_USER'),
    'PASSWORD': get_secret('DB_PASS'),
})
