#!/bin/sh

django-admin startproject config .
python3 manage.py startapp api
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic --no-input
gunicorn config.wsgi:application --bind 0.0.0.0:8000
