package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(mysql:3306)/db")
	if err != nil {
		panic(err.Error())
	}

	defer db.Close()
	db.Query("CREATE TABLE products (id int, name varchar(255))")
	db.Query("INSERT INTO products (id, name) VALUES ( 1, 'Product no. 01')")
	db.Query("INSERT INTO products (id, name) VALUES ( 2, 'Product no. 02')")

}
