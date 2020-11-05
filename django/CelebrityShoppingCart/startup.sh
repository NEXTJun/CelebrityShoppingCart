#!/bin/bash

# Sync database
python manage.py makemigrations item_admin
python manage.py migrate

# Starup

# Lanch by django
# python manage.py runserver 0:8000 --insecure

# Lanch by uwsgi
uwsgi --ini uwsgi.ini