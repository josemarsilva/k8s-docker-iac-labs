# /bin/bash

# waiting mssql be ready
echo "waiting mssql be ready ..."
sleep 15

#do this in a loop because the timing for when the SQL instance is ready is indeterminate
for i in {1..60};
do
    # run the setup script to create the DB and the schema in the DB
    /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Password@123" -i /usr/src/app/is-mssql-ready.sql -o /usr/src/app/is-mssql-ready.log
    if [ $? -eq 0 ]
    then
        echo "starting initialization ..."

        /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Password@123" -i /usr/src/app/script-deploy-01.sql -o /usr/src/app/script-deploy-01.log
        
        echo "initialization completed"
        break
    else
        echo "mssql is not ready yet..."
        sleep 1
    fi
done
