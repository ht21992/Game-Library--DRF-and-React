
from django.shortcuts import render
from django.http import JsonResponse
from .models import Game
from .serializers import GameSerializer
from rest_framework import viewsets


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all().order_by('-created')
    lookup_body_field = 'id'
    serializer_class = GameSerializer

    def get_queryset(self):
        if 'favs' in str(self.request.get_full_path):
            queryset = Game.objects.filter(is_fav=True).order_by('-created')
        else:
            queryset = Game.objects.all().order_by('-created')
        return queryset

    def partial_update(self, request, *args, **kwargs):
        gameId = self.request.data.get('gameId', '')
        fav = self.request.data.get('fav', '')
        if gameId != '':
            current_game = Game.objects.get(id=gameId)
            current_game.is_fav = bool(fav)
            current_game.save(update_fields=['is_fav'])
        return super().partial_update(request, *args, **kwargs)

    def create(self, request):  # Here is the new update comes <<<<
        serializer = self.serializer_class(
            data=request.data, context={'request': request})

        if serializer.is_valid():

            title = serializer.data.get('title')
            image = serializer.data.get('image')
            developer = serializer.data.get('developer')
            platforms = serializer.data.get('platforms')
            genre = serializer.data.get('genre')
            desc = serializer.data.get('desc')

            Game.objects.create(title=title,
                                image=image,
                                developer=developer,
                                platforms=platforms,
                                genre=genre,
                                desc=desc,
                                )
            return JsonResponse({'status': 200, "msg": f"{title} has been added into game library"})
        else:
            return JsonResponse({'status': 400, "msg": serializer.error_messages})
