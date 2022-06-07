# filename   : Dockerfile
# Description: Dockerfile PYTHON ephermaral application
# Remarks    :
#				* https://github.com/docker-library/python/blob/f132a564fbabeaa88abd21c1cf8c7b400d10251b/3.9/slim-buster/Dockerfile

# Base Docker images
FROM python:3.9-slim-buster

# Switch to root user for access to apt-get install

# Environment variables

# Install packages

# install pip libraries
COPY requirements.txt .
RUN python -m pip install -r requirements.txt

# Create app directory
RUN mkdir -p /app
RUN mkdir -p /app/resources
WORKDIR /app

# Copy initialization scripts
COPY *.py /app
#COPY resources/*.* ./resources

# EXPOSE 5000

# python application

# Entrypoint 
CMD ["python", "py-http-echo.py"]
