# filename   : Dockerfile
# Description: Dockerfile MSSQL initialized for api-events project
# Remarks    :
#               - https://stackoverflow.com/questions/58309452/docker-initialize-database-tables-and-records-in-sql-server

# Base Docker images
FROM mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04

# User
USER root

# Work directory
WORKDIR /app

# Environment variables

# Copy initialization scripts
COPY setup.sql .
COPY run-initialization.sh .

# Run/Cmd initialization scripts
RUN chmod +x run-initialization.sh
CMD ["/bin/bash", "./run-initialization.sh"]
