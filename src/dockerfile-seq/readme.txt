https://hub.docker.com/r/datalust/seq

# ###
nerdctl.exe image pull datalust/seq

# ###
nerdctl.exe container rm -f seq

# run insecure
nerdctl.exe container run --name seq -d --restart always -e ACCEPT_EULA=Y -p 5341:5341 datalust/seq:latest

# ###
nerdctl.exe container run --name seq -d --restart always -e ACCEPT_EULA=Y -e SEQ_FIRSTRUN_ADMINPASSWORDHASH=xxxx -v ../../volume/seq/data:/data -p 80:8000 -p 5341:5341 datalust/seq

# ###
nerdctl.exe container run --name seq -d --restart always -e ACCEPT_EULA=Y -e SEQ_FIRSTRUN_ADMINPASSWORDHASH="$PH" -v ../../volume/seq/data:/data -p 80:8000 -p 5341:5341 datalust/seq
