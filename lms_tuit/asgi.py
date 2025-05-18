"""
ASGI config for lms_tuit project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_tuit.settings')

application = get_asgi_application()
