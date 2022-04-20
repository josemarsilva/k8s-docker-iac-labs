package main

import "net/http"

func main() {
	http.HandleFunc("/", homepage)
	http.HandleFunc("/doc", doc)
	http.ListenAndServe(":8081", nil)
}

func homepage(w http.ResponseWriter, r *http.Request) {
	content := "<HTML> <BODY> <H1>Homepage works!</H1></BODY> </HTML>"
	w.Write([]byte(content))
}

func doc(w http.ResponseWriter, r *http.Request) {
	content := "<HTML> <BODY> <H1>/doc path works!</H1></BODY> </HTML>"
	w.Write([]byte(content))
}
