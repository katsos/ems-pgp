from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.contrib.auth.views import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login', LoginView.as_view(template_name='login.html'), name='login'),

    # let front-end router handle the rest
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
