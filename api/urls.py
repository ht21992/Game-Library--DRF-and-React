
from django.urls import path, include

from . import views

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'games', views.GameViewSet)

urlpatterns = [
    path('', include((router.urls, 'games'))),

]
