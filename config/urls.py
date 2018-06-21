from django.conf.urls import include
from django.urls import path, re_path

urlpatterns = [
    path('api/', include('api.urls')),
    re_path('.*', include('browser.urls')),
]
