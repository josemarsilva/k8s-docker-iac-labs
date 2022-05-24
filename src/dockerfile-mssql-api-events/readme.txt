README
======

1. Build image Construir a imagem do MSSQL com o database de exemplo Northwind

    $ nerdctl.exe image build --no-cache -t josemarsilva/mssql-api-events:v1 .
    $ nerdctl.exe tag josemarsilva/mssql-api-events:v1 josemarsilva/mssql-api-events:latest
    $ nerdctl.exe image ls | grep mssql-api-events

    PS:
    (1) Force remove if necessary
        $ nerdctl.exe container rm -f mssql-api-events
        $ nerdctl.exe image rm josemarsilva/mssql-api-events:latest
        $ nerdctl.exe image rm josemarsilva/mssql-api-events:v1
        $ nerdctl.exe image ls | grep mssql-api-events
    (2) Optionally Push image to registry
        $ nerdctl.exe image ls | grep mssql-api-events
        $ nerdctl.exe push josemarsilva/mssql-api-events:latest
    (3) Login if necessary:
        $ nerdctl.exe login -u josemarsilva

2. Run START background deamon SQLServer

    $ nerdctl.exe container run --name mssql-api-events -d -p "1433:1433" -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Password@123" -d josemarsilva/mssql-api-events:latest

    PS:
    (1) Remove previous inactive container if necessary
        $ nerdctl.exe container ls -a | grep mssql-api-events
        $ nerdctl.exe container rm -f mssql-api-events

4. Connect toSQL Server using the sqlcmd tool inside of the container

    $ nerdctl.exe container ls
    CONTAINER ID    IMAGE                                                        COMMAND                   CREATED           STATUS    PORTS                        NAMES
    71df89e49200    docker.io/josemarsilva/mssql-api-events:latest    "/opt/mssql/bin/perm…"    24 seconds ago    Up        0.0.0.0:1433->1433/tcp, 0.0.0.0:1433->1433/tcp    mssql-api-events

    $ nerdctl.exe container logs mssql-api-events -f
    ^C (to abort)

    $ nerdctl.exe container exec -it mssql-api-events -- bash
    root@71df89e49200:/usr/src/app# ls 
    entrypoint.sh          script-deploy-01.log  script-deploy-01.sql
    is-mssql-ready.log     is-mssql-ready.sql    run-initialization.sh

    $ nerdctl.exe container exec -it mssql-api-events /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password@123
    SELECT * FROM INFORMATION_SCHEMA.TABLES
    GO




REFERENCES
==========

* https://hub.docker.com/_/microsoft-mssql-server
* https://www.softwaredeveloper.blog/initialize-mssql-in-docker-container
