from django.conf.urls import include
from django.urls import path, re_path
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('server.api.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
