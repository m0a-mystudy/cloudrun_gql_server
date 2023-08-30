
.PHONY: setup
setup:
	go install -tags 'sqlite3' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

migrate_up:
	migrate -database 'sqlite3://database.sqlite3' -path migrations/ up

migrate_down:
	migrate -database 'sqlite3://database.sqlite3' -path migrations/ down 1