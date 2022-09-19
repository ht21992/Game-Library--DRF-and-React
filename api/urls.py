
from django.urls import path

from . import views
urlpatterns = [

    path('games/', views.GameView.as_view(), name='game-api-list-view'),
    path('favs/', views.FavGameView.as_view(), name='fav-games'),
    path("game/<int:pk>", views.GameDetail.as_view(),
         name='game-api-detail-view'),
    path('add-game', views.CreateGameView.as_view(),
         name='game-api-create-view'),

]
