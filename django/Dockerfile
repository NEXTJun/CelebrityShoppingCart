# Use an official Python runtime as a parent image
FROM python:3.7-slim

# Record the maintainer information
MAINTAINER Kino sssqqq3@hotmail.com

ARG SUPER_USERNAME="admin"
ARG SUPER_PASSWORD="admin"

# Define environment variable
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN apt-get update; \
    apt-get upgrade -y --no-install-recommends; \
    pip install pip -U; \
    pip install -r requirements.txt

# Set the working directory to /app/CelebrityShoppingCart
WORKDIR /app/CelebrityShoppingCart

# Install any needed packages specified in requirements.txt
RUN python manage.py makemigrations item_admin; \
    python manage.py migrate; \
    echo "from django.contrib.auth.models import User; User.objects.create_superuser('${SUPER_USERNAME}', '', '${SUPER_PASSWORD}')" | python manage.py shell

# Make port 80 available to the world outside this container
EXPOSE 80

# Run app.py when the container launches
CMD ["python", "manage.py", "runserver", "0:80", "--insecure"]