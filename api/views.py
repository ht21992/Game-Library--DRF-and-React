

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
            video = serializer.data.get('video')

            Game.objects.create(title=title,
                                image=image,
                                developer=developer,
                                platforms=platforms,
                                genre=genre,
                                desc=desc,
                                video=video
                                )
            return JsonResponse({'status': 200, "msg": f"{title} has been added into game library"})
        else:
            return JsonResponse({'status': 400, "msg": serializer.error_messages})


class GameDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
