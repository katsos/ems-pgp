from django.urls import re_path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from .views import ProgramsViewSet

router = DefaultRouter()
router.register(r'programs', ProgramsViewSet)
urlpatterns = [
    re_path(r'^', include(router.urls)),
]
