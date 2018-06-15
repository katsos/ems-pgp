from .base import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/
DEBUG = True
ALLOWED_HOSTS = ['*']
SECRET_KEY = 'b+9s&wf&!fx3&7d0s-+%p*^*fy4j@35m_h0_!k4l$77$=bf+wf'

DATABASES['default'].update({
    'USER': 'nkatsos',
    'PASSWORD': '',
})
