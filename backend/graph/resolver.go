package graph

import (
	"database/sql"

	"golang.org/x/exp/slog"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB     *sql.DB
	Logger *slog.Logger
}
