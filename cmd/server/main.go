package main

import (
	"context"
	"database/sql"
	"log"
	"net/http"
	"os"
	"strings"

	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/exp/slog"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/m0a/cloudrun_gql_server/graph"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	db, err := connectSQLite3()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Loggerの設定
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		DB:     db,
		Logger: logger,
	}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", authenticationMiddleware(srv))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func connectSQLite3() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "./database.sqlite3")
	if err != nil {
		return nil, err
	}
	return db, nil
}

func authenticationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authorizationHeader := r.Header.Get("Authorization")
		if authorizationHeader != "" {
			parts := strings.Split(authorizationHeader, " ")
			if len(parts) == 2 && strings.ToLower(parts[0]) == "bearer" {
				token := parts[1]
				ctx := context.WithValue(r.Context(), "token", token)
				next.ServeHTTP(w, r.WithContext(ctx))
				return
			}
		}
		next.ServeHTTP(w, r)
	})
}
