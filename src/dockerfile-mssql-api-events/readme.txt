README
======

1. Run START background deamon SQLServer

    C:\> nerdctl container run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=yourStrong(!)Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04

2. Connect toSQL Server using the sqlcmd tool inside of the container

    C:\> nerdctl container ls
    CONTAINER ID    IMAGE                                                    COMMAND                   CREATED           STATUS    PORTS                     NAMES
    4dccb509b67f    mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04    "/opt/mssql/bin/perm…"    24 seconds ago    Up        0.0.0.0:1433->1433/tcp    server-8f033

    C:\> nerdctl container exec -it 4dccb509b67f /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P yourStrong(!)Password
    SELECT * FROM INFORMATION_SCHEMA.TABLES
    GO

3. Stop REMOVE background deamon SQLServer

    C:\> nerdctl container rm -f 4dccb509b67f


REFERENCES
==========

* https://hub.docker.com/_/microsoft-mssql-server
