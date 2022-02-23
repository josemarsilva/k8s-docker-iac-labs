#/usr/bin/bash

# wait for MSSQL Server startup
sleep 10

#run the setup script to create the DB and the schema in the DB
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "StrongPassword@12345" -i /app/setup.sql -o /app/setup.log
