PROJECT_ID := $(shell gcloud config get-value project)

.PHONY: setup
setup: setup-ko-build
	go install -tags 'sqlite3' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
	go install github.com/volatiletech/sqlboiler-sqlite3

setup-ko-build:
	gcloud builds submit --tag asia-northeast1-docker.pkg.dev/$(PROJECT_ID)/artifacts/ko-build ./ko-build

migrate_up:
	migrate -database 'sqlite3://database.sqlite3' -path migrations/ up

migrate_down:
	migrate -database 'sqlite3://database.sqlite3' -path migrations/ down 1

generate_models:
	sqlboiler sqlite3 --output models --pkgname models --wipe

gqlgen:
	go run github.com/99designs/gqlgen@latest generate

build-gql-server:
	KO_DOCKER_REPO=asia-northeast1-docker.pkg.dev/$(PROJECT_ID)/repository/gql-server \
	ko build --bare -t latest ./cmd/server



