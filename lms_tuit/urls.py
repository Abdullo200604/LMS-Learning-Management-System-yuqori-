from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token

# Non-translatable URLs
urlpatterns = [
    path('i18n/', include('django.conf.urls.i18n')),
    path('api/token/', obtain_auth_token, name='api_token'),
    path('api/users/', include('users.api.urls')),
    path('api/courses/', include('courses.api.urls')),
    # Add other API endpoints here
]

# Translatable URLs
urlpatterns += i18n_patterns(
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path('courses/', include('courses.urls')),
    path('news/', include('news.urls')),
    path('assignments/', include('assignments.urls')),
    path('exams/', include('exams.urls')),
    prefix_default_language=False,
)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [path('api-auth/', include('rest_framework.urls'))]
