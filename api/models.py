
from django.db import models


class Game(models.Model):
    title = models.CharField(blank=False, max_length=255)
    desc = models.CharField(default="", max_length=2000)
    genre = models.CharField(default="Not specified", max_length=255)
    developer = models.CharField(default="Not specified", max_length=255)
    platforms = models.CharField(default="Not specified", max_length=255)
    image = models.URLField(
        default="https://t3.ftcdn.net/jpg/01/71/29/48/360_F_171294824_FDLwEWTzlfVr8iE0qojO0mmai44fdbIj.jpg")
    video = models.URLField(
        default="")
    is_fav = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title
