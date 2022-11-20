from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Actor)
admin.site.register(Director)
admin.site.register(Genres)
admin.site.register(Movie)
admin.site.register(Characters)
admin.site.register(Comment)