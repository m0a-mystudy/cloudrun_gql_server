package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"
	"fmt"

	"github.com/m0a/cloudrun_gql_server/graph/model"
)

// Signup is the resolver for the signup field.
func (r *mutationResolver) Signup(ctx context.Context, email string, password string, username *string) (*model.AuthPayload, error) {
	panic(fmt.Errorf("not implemented: Signup - signup"))
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (*model.AuthPayload, error) {
	panic(fmt.Errorf("not implemented: Login - login"))
}

// ChangePassword is the resolver for the changePassword field.
func (r *mutationResolver) ChangePassword(ctx context.Context, oldPassword string, newPassword string) (bool, error) {
	panic(fmt.Errorf("not implemented: ChangePassword - changePassword"))
}

// Me is the resolver for the me field.
func (r *queryResolver) Me(ctx context.Context) (*model.User, error) {
	panic(fmt.Errorf("not implemented: Me - me"))
}
