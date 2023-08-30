
.PHONY: setup
setup:
	go install -tags 'sqlite3' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
	go install github.com/volatiletech/sqlboiler-sqlite3

migrate_up:
	migrate -database 'sqlite3://database.sqlite3' -path migrations/ up

migrate_down:
	migrate -database 'sqlite3://database.sqlite3' -path migrations/ down 1

generate_models:
	sqlboiler sqlite3 --output models --pkgname models --wipe
