# filename   : Dockerfile
# Description: Dockerfile MSSQL initialized for api-events project
# Remarks    :
#               - https://hub.docker.com/_/microsoft-mssql-server
#               - https://github.com/twright-msft/mssql-node-docker-demo-app

# Base Docker images
FROM mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04

# Switch to root user for access to apt-get install
USER root

# Install packages
RUN apt-get -y update  && \
    apt-get install -y curl

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Environment variables

# Copy initialization scripts
COPY entrypoint.sh .
COPY import-data.sh .
COPY *.sql .
COPY *.csv .

# Grant permissions for the import-data script to be executable
RUN chmod +x /usr/src/app/import-data.sh

# Switch back to mssql user and run the entrypoint script
USER mssql
ENTRYPOINT /bin/bash ./entrypoint.sh
