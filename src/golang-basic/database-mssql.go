package main

// import sql database driver
import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/denisenkom/go-mssqldb"
)

// Type of Product struct
type Product struct {
	code        string
	description string
	price       float64
}

func queryDatabases() {
	// Connect database
	connString := "server=127.0.0.1;Database=test;user id=sa;password=StrongPassword@123;port=1433"
	db, err := sql.Open("mssql", connString)
	if err != nil {
		log.Fatal("Open connection failed:", err.Error())
	}

	// Query database
	rows, err := db.Query("select name from sys.databases")
	if err != nil {
		log.Fatal("Query failed:", err.Error())
	}

	// Print titles
	fmt.Printf("\ndatabase_name\n-------------\n")

	// Next rows
	for rows.Next() {
		var databaseName string
		err = rows.Scan(&databaseName)
		if err != nil {
			log.Fatal("Scan query row failed:", err.Error())
		}
		// Print row
		fmt.Printf("%s\n", databaseName)
	}
	if err != nil {
		log.Fatal("Next statement Query failed:", err.Error())
	}

	// Print footer
	fmt.Printf("\n")

	// Close database connection
	db.Close()

}

func databaseCatalog() {
	// Connect database
	connString := "server=127.0.0.1;Database=test;user id=sa;password=StrongPassword@123;port=1433"
	db, err := sql.Open("mssql", connString)
	if err != nil {
		log.Fatal("Open connection failed:", err.Error())
	}

	// Query database
	rows, err := db.Query("SELECT table_catalog, table_schema, table_name, column_name, ordinal_position, is_nullable, data_type, COALESCE(CAST(character_maximum_length AS VARCHAR(10)) ,0) FROM INFORMATION_SCHEMA.COLUMNS ORDER BY table_catalog, table_schema, table_name, ordinal_position")
	if err != nil {
		log.Fatal("Query failed:", err.Error())
	}

	// Print titles
	fmt.Printf("\ntable_catalog, table_schema, table_name,column_name, ordinal_position, is_nullable, data_type, character_maximum_length\n-----------------------------------------------------------------------------------------------------------------------\n")

	// Next rows
	for rows.Next() {
		var (
			tableCatalog           string
			tableSchema            string
			tableName              string
			columnName             string
			ordinalPosition        int
			isNullable             string
			dataType               string
			characterMaximumLength string
		)
		err = rows.Scan(&tableCatalog, &tableSchema, &tableName, &columnName, &ordinalPosition, &isNullable, &dataType, &characterMaximumLength)
		if err != nil {
			log.Fatal("Scan query row failed:", err.Error())
		}
		// Print row
		fmt.Printf("%s, %s, %s, %s, %d, %s, %s, %s\n", tableCatalog, tableSchema, tableName, columnName, ordinalPosition, isNullable, dataType, characterMaximumLength)
	}
	if err != nil {
		log.Fatal("Next statement Query failed:", err.Error())
	}

	// Print footer
	fmt.Printf("\n")

	// Close database connection
	db.Close()
}

// Function initialize some Products
func generateSomeProducts() []Product {
	var products []Product

	product1 := Product{
		code:        "air",
		description: "Air we breath",
		price:       0.99,
	}

	product2 := Product{
		code:        "water",
		description: "Water chemical product",
		price:       1.99,
	}

	product3 := Product{
		code:        "light",
		description: "Light heat us",
		price:       2.99,
	}

	products = append(products, product1, product2, product3)

	return products
}

// func persist products in database and return something wrong in error
func persistProducts() error {
	// Connect database
	connString := "server=127.0.0.1;Database=test;user id=sa;password=StrongPassword@123;port=1433"
	db, err := sql.Open("mssql", connString)
	if err != nil {
		log.Fatal("Open connection failed:", err.Error())
	}

	// Prepare statement to insert into database
	stmt, err := db.Prepare("insert into products (code, description, price) values ($1, $2, $3)")
	if err != nil {
		log.Fatal("Prepare statement Insert failed:", err.Error())
	}

	// Invoke generate some products
	products := generateSomeProducts()
	for i := 0; i < len(products); i++ {
		// Execute statement
		_, err = stmt.Exec(products[i].code, products[i].description, products[i].price)
		if err != nil {
			log.Fatal("Exec statement Insert failed:", err.Error())
		}
	}

	// Close statement insert
	stmt.Close()

	// Query post insert database
	rows, err := db.Query("SELECT id, code, description, price FROM products")
	if err != nil {
		log.Fatal("Query failed:", err.Error())
	}

	// Print titles
	fmt.Printf("\nid, code, description, price\n----------------------------\n")

	// Next rows
	for rows.Next() {
		var (
			id          int
			code        string
			description string
			price       float32
		)
		err = rows.Scan(&id, &code, &description, &price)
		if err != nil {
			log.Fatal("Scan query row failed:", err.Error())
		}
		// Print row
		fmt.Printf("%d, %s, %s, %d\n", id, code, description, price)
	}
	if err != nil {
		log.Fatal("Next statement Query failed:", err.Error())
	}

	// Close database connection
	db.Close()

	// Default return
	return nil
}

func main() {
	// Query databases
	queryDatabases()

	// Query databaseCatalog
	databaseCatalog()

	// Persist and query products
	persistProducts()

}
