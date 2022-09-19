from django.http import JsonResponse
from rest_framework import generics
from .models import Game
from .serializers import GameSerializer


class GameView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class FavGameView(generics.ListAPIView):
    queryset = Game.objects.filter(is_fav=True)
    serializer_class = GameSerializer


class CreateGameView(generics.CreateAPIView):
    serializer_class = GameSerializer

    def post(self, request, format=None):
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


class GameDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def put(self, request, format=None, *args, **kwargs):
        gameId = request.data.get('gameId', '')
        fav = request.data.get('fav', '')

        if gameId != '':
            current_game = Game.objects.get(id=gameId)

            current_game.is_fav = bool(fav)
            current_game.save(update_fields=['is_fav'])

        return self.update(request, *args, **kwargs)
