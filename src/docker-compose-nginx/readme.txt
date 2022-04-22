README
======

1. Creating custom image for nginx

    nerdctl image build -t josemarsilva/nginx-josemarsilva .

2. Push cutom image nginx in Dockerhub registry

    nerdctl images | findstr "nginx-josemarsilva"
    nerdctl push josemarsilva/nginx-josemarsilva

3. Start UP docker-composer

    nerdctl compose up -d

4. Stop DOWN docker-composer

    nerdctl compose down
