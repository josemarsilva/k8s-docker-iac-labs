README
======

1. Start UP docker-composer

    nerdctl compose up -d

2. Connect Mysql database and test some commands (use password 'root')

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

3. Stop DOWN docker-composer

    nerdctl compose down

