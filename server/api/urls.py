from django.urls import re_path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter
from .views import CirclesViewSet, ExpensesViewSet, PaymentsViewSet, RegistrationsViewSet, StudentsViewSet

router = DefaultRouter()
router.register(r'circles', CirclesViewSet)
router.register(r'expenses', ExpensesViewSet)
router.register(r'payments', PaymentsViewSet)
router.register(r'registrations', RegistrationsViewSet)
router.register(r'students', StudentsViewSet)
urlpatterns = [
    re_path(r'^', include(router.urls)),
]
