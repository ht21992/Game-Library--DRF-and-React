from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('add-game', index),
    path('favs', index),
    path('game/<int:id>', index),
]
