README
======

1. Start UP docker-composer

    nerdctl compose up -d

2. Explore o ambient

2.1. Connect Mysql database (use password 'root') and show tables (still empty)

    C:> mysql -h 127.0.0.1 -u root -proot

        mysql> show databases;
            +--------------------+
            | Database           |
            +--------------------+
            | information_schema |
            | db                 |
            | mysql              |
            | performance_schema |
            | sys                |
            +--------------------+
            5 rows in set (0.04 sec)

        mysql> use db;
        Database changed

        mysql> show tables;
        Empty set (0.01 sec)

2.2. Connect container GO using EXEC

    C:\> nerdctl container ls
        CONTAINER ID    IMAGE                                                           COMMAND                   
        1e92457256ea    docker.io/library/mysql:5.7                                     "docker-entrypoint.s…"    
        bfddbf6a582b    docker.io/library/dockerfile-compose-mysql-golang_app:latest    "tail -f /dev/null"       

    C:\> nerdctl container exec -it bfddbf6a582b bash

        root@app:/go/src# go mod init exemplo
        root@app:/go/src# go get github.com/go-sql-driver/mysql
        root@app:/go/src# go run main.go

2.3. Connect Mysql database and check what happened

        mysql> show tables;
        +--------------+
        | Tables_in_db |
        +--------------+
        | products     |
        +--------------+
        1 row in set (0.01 sec)

        mysql> SELECT * FROM products;
        +------+----------------+
        | id   | name           |
        +------+----------------+
        |    1 | Product no. 01 |
        |    2 | Product no. 02 |
        +------+----------------+
        2 rows in set (0.00 sec)

3. Stop DOWN docker-composer

    nerdctl compose down

