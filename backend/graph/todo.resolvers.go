package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.37

import (
	"context"
	"fmt"
	"strconv"

	"github.com/m0a/cloudrun_gql_server/auth"
	"github.com/m0a/cloudrun_gql_server/graph/model"
	"github.com/m0a/cloudrun_gql_server/models"
	"github.com/samber/lo"
	null "github.com/volatiletech/null/v8"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

// CreateTodo is the resolver for the createTodo field.
func (r *mutationResolver) CreateTodo(ctx context.Context, input model.NewTodo) (*model.Todo, error) {
	// GetUserIDFromContext関数を使用してユーザーIDを取得
	userID, err := auth.GetUserIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	// 新しいTodoアイテムをデータベースに挿入
	newTodo := &models.Todo{
		Text:   input.Text,
		Done:   false, // デフォルト値
		UserID: userID,
	}
	err = newTodo.Insert(ctx, r.DB, boil.Infer())
	if err != nil {
		return nil, fmt.Errorf("failed to insert new todo: %v", err)
	}

	u, err := models.Users(models.UserWhere.ID.EQ(userID)).One(ctx, r.DB)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %v", err)
	}

	return &model.Todo{
		ID:   strconv.FormatInt(newTodo.ID.Int64, 10),
		Text: newTodo.Text,
		Done: newTodo.Done,
		User: &model.User{
			ID:       strconv.FormatInt(u.ID.Int64, 10),
			Email:    u.Email,
			Username: &u.Username.String,
		},
	}, nil
}

// ToggleTodoDone is the resolver for the toggleTodoDone field.
func (r *mutationResolver) ToggleTodoDone(ctx context.Context, id string) (*model.Todo, error) {
	userID, err := auth.GetUserIDFromContext(ctx)
	if err != nil {
		return nil, err
	}

	user, err := models.Users(models.UserWhere.ID.EQ(userID)).One(ctx, r.DB)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %v", err)
	}

	// IDからTodoを検索
	todoID, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return nil, fmt.Errorf("invalid id: %v", err)
	}

	todo, err := models.FindTodo(ctx, r.DB, null.Int64From(todoID))
	if err != nil {
		return nil, fmt.Errorf("Todo not found: %v", err)
	}

	// doneフィールドをトグル
	todo.Done = !todo.Done

	// データベースを更新
	_, err = todo.Update(ctx, r.DB, boil.Infer())
	if err != nil {
		return nil, fmt.Errorf("Failed to update Todo: %v", err)
	}

	return &model.Todo{
		ID:   id,
		Text: todo.Text,
		Done: todo.Done,
		User: &model.User{
			ID:       strconv.FormatInt(user.ID.Int64, 10),
			Email:    user.Email,
			Username: &user.Username.String,
		},
	}, nil
}

// Todos is the resolver for the todos field.
func (r *queryResolver) Todos(ctx context.Context) ([]*model.Todo, error) {
	// GetUserIDFromContext関数を使用してユーザーIDを取得
	userID, err := auth.GetUserIDFromContext(ctx)
	if err != nil {
		return nil, err
	}
	u, err := models.Users(models.UserWhere.ID.EQ(userID)).One(ctx, r.DB)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %v", err)
	}
	boil.DebugMode = true
	todos, err := models.Todos(
		models.TodoWhere.UserID.EQ(userID),
		qm.OrderBy(models.TodoColumns.Done+" DESC"),
		qm.OrderBy(models.TodoColumns.ID+" ASC"),
	).
		All(ctx, r.DB)
	if err != nil {
		return nil, fmt.Errorf("failed to get todos: %v", err)
	}
	boil.DebugMode = false
	return lo.Map(todos, func(t *models.Todo, _ int) *model.Todo {
		return &model.Todo{
			ID:   strconv.FormatInt(t.ID.Int64, 10),
			Text: t.Text,
			Done: t.Done,
			User: &model.User{
				ID:       strconv.FormatInt(u.ID.Int64, 10),
				Email:    u.Email,
				Username: &u.Username.String,
			},
		}
	}), nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
