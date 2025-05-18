"""
WSGI config for lms_tuit project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_tuit.settings')

application = get_wsgi_application()
