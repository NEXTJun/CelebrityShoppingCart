# Use an official Python runtime as a parent image
FROM python:3.7

# Record the maintainer information
MAINTAINER Kino sssqqq3@hotmail.com

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

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run /app/CelebrityShoppingCart/startup.sh when the container launches
CMD ["sh", "startup.sh"]