// ////////////////////////////////////////////////////////////////////////////
// .\src\golang-basic\http-server-crud-template-database-mssql.go
// ////////////////////////////////////////////////////////////////////////////
package main

// ////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////
import (
	"database/sql"
	"html/template"
	"log"
	"net/http"

	_ "github.com/denisenkom/go-mssqldb"
)

// ////////////////////////////////////////////////////////////////////////////
// Struct of Product
// ////////////////////////////////////////////////////////////////////////////
type Product struct {
	id          int     `json:id`
	code        string  `json:product_code`
	description string  `json:product_description`
	price       float64 `json:product_price`
}

// ////////////////////////////////////////////////////////////////////////////
// Template HTML
// ////////////////////////////////////////////////////////////////////////////
var tmpl = template.Must(template.ParseGlob("views/test*.tmpl"))

// ////////////////////////////////////////////////////////////////////////////
// main()
// ////////////////////////////////////////////////////////////////////////////
func main() {
	// Server started
	log.Println("Server started on: http://localhost:8081")

	// Routes mapped
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/index", indexHandler)
	http.HandleFunc("/show", showHandler)
	http.HandleFunc("/new", new)

	// Routes actions
	http.HandleFunc("/insert", insertHandler)
	http.HandleFunc("/update", updateHandler)
	http.HandleFunc("/delete", deleteHandler)

	// Routes for test
	http.HandleFunc("/test1", test1Handler)
	http.HandleFunc("/test2", test2Handler)

	// Listen and serve
	http.ListenAndServe(":8081", nil)
}

// ////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////
func rootHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("GET /")
	content := "<HTML>" +
		"<BODY>" +
		"<H1>http-server-crud-template-database-mssql.go</H1>" +
		"<a href=\"/\">HOME</a> &nbsp; &nbsp; &nbsp; " +
		"<a href=\"/test1\">test1-monolithic</a> &nbsp; &nbsp; &nbsp; " +
		"<a href=\"/test2\">test2-multiple-parts</a> &nbsp; &nbsp; &nbsp; " +
		"</BODY>" +
		"</HTML>"
	w.Write([]byte(content))
}

// ////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////
func test1Handler(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method + " " + r.RequestURI)
	// Render template page
	tmpl.ExecuteTemplate(w, "test1", nil)
}

// ////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////
func test2Handler(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method + " " + r.RequestURI)
	// Render template page
	tmpl.ExecuteTemplate(w, "test2", nil)
}

// ////////////////////////////////////////////////////////////////////////////
// dbConn:
// ////////////////////////////////////////////////////////////////////////////
func dbConn() (db *sql.DB) {
	// Connection string
	connString := "server=127.0.0.1;Database=test;user id=sa;password=StrongPassword@123;port=1433"

	// Connect database
	db, err := sql.Open("mssql", connString)
	if err != nil {
		log.Fatal("Open connection failed:", err.Error())
	}

	// Log
	log.Println("dbConn(): connString")

	// Return
	return db
}

// ////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////
func indexHandler(w http.ResponseWriter, r *http.Request) {
	// Connect database
	db := dbConn()

	// Query database
	rows, err := db.Query("SELECT * FROM products ORDER BY id DESC")
	if err != nil {
		panic(err.Error())
	}

	// Struct used by template
	product := Product{}

	// Array of Structs
	products := []Product{}

	// Fetch rows from database query
	for rows.Next() {
		// Variables used to transport data from query rows to template struct
		var (
			id          int
			code        string
			description string
			price       float64
		)

		// Scan binded columns from query rows
		err = rows.Scan(&id, &code, &description, &price)
		if err != nil {
			panic(err.Error())
		}

		// Transport data from query rows to template struct
		product.id = id
		product.code = code
		product.description = description
		product.price = price

		// Struct com Array
		products = append(products, product)
	}

	// Close database connection
	defer db.Close()

	// Render index template page
	tmpl.ExecuteTemplate(w, "index", products)
}

// ////////////////////////////////////////////////////////////////////////////
// new:
// ////////////////////////////////////////////////////////////////////////////
func new(w http.ResponseWriter, r *http.Request) {
	tmpl.ExecuteTemplate(w, "new", nil)
}

// ////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////
func showHandler(w http.ResponseWriter, r *http.Request) {
	// Connect database
	db := dbConn()

	// Get id from URL
	productId := r.URL.Query().Get("id")

	// Query row from database
	rows, err := db.Query("SELECT * FROM names WHERE id=?", productId)
	if err != nil {
		panic(err.Error())
	}

	// Struct used by template
	product := Product{}

	// Fetch row from database query
	rows.Next()

	// Variables used to transport data from query rows to template struct
	var (
		id          int
		code        string
		description string
		price       float64
	)

	// Scan binded columns from query rows
	err = rows.Scan(&id, &code, &description, &price)
	if err != nil {
		panic(err.Error())
	}

	// Transport data from query rows to template struct
	product.id = id
	product.code = code
	product.description = description
	product.price = price

	// Close database connection
	defer db.Close()

	// Render show template page
	tmpl.ExecuteTemplate(w, "show", product)
}

// ////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////
func insertHandler(w http.ResponseWriter, r *http.Request) {
	// Connect database
	db := dbConn()

	// Check http METHOD
	if r.Method == "POST" {
		// Extract data from forms values
		code := r.FormValue("code")
		description := r.FormValue("description")
		price := r.FormValue("price")

		// Prepare statement INSERT
		stmt, err := db.Prepare("INSERT INTO products(code, description, price) VALUES(?,?,?)")
		if err != nil {
			panic(err.Error())
		}

		// Execute statement INSERT
		stmt.Exec(code, description, price)

		// Log database INSERT
		log.Println("INSERT: " + code + ", " + description)
	}

	// Close database connection
	defer db.Close()

	// Redirect HOME
	http.Redirect(w, r, "/", 301)
}

// ////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////
func updateHandler(w http.ResponseWriter, r *http.Request) {
	// Connect database
	db := dbConn()

	// Check http METHOD
	if r.Method == "POST" {
		// Extract data from forms values
		id := r.FormValue("id")
		code := r.FormValue("code")
		description := r.FormValue("description")
		price := r.FormValue("price")

		// Prepare statement UPDATE
		stmt, err := db.Prepare("UPDATE products SET code=?, description=?, price=? WHERE id=?")
		if err != nil {
			panic(err.Error())
		}

		// Execute statement UPDATE
		stmt.Exec(code, description, price, id)

		// Log database UPDATE
		log.Println("INSERT: " + code + ", " + description)
	}

	// Close database connection
	defer db.Close()

	// Redirect HOME
	http.Redirect(w, r, "/", 301)
}

// ////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////
func deleteHandler(w http.ResponseWriter, r *http.Request) {
	// Connect database
	db := dbConn()

	// Get id from URL
	id := r.URL.Query().Get("id")

	// Prepare statement DELETE
	stmt, err := db.Prepare("DELETE FROM products WHERE id=?")
	if err != nil {
		panic(err.Error())
	}

	// Execute statement DELETE
	stmt.Exec(id)

	// Log database DELETE
	log.Println("DELETE: " + id)

	// Close database connection
	defer db.Close()

	// Redirect HOME
	http.Redirect(w, r, "/", 301)
}

// ////////////////////////////////////////////////////////////////////////////
//
// ////////////////////////////////////////////////////////////////////////////
