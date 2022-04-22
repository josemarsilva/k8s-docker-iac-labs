README
======

1. Start UP docker-composer

    nerdctl compose up -d

2. Connect RabbitMQ (user/password: root/root, port: 15672, 5672 )

    http://127.0.0.1:15672/

        +------------------+
        | username: root   |
        | password: root   |
        |          +-----+ |
        |          |login| |
        |          +-----+ |
        +------------------+


3. Stop DOWN docker-composer

    nerdctl compose down

