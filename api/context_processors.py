from gc import is_finalized
from .models import Game


def get_fav_games(request: object):
    fav_counter = Game.objects.filter(is_fav=True).count()
    return {'fav_counter': fav_counter}
