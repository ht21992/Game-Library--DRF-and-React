# Generated by Django 4.1.1 on 2022-09-15 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_game_developer_game_genre'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='platforms',
            field=models.CharField(default='Not specified', max_length=255),
        ),
    ]
