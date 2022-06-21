nerdctl.exe image pull datalust/seq

nerdctl.exe container run  --name seq -d --restart unless-stopped -e ACCEPT_EULA=Y -e SEQ_FIRSTRUN_ADMINPASSWORDHASH="$PH" -v /path/to/seq/data:/data -p 80:8000 -p 5341:5341 datalust/seq
