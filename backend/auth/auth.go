package auth

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/m0a/cloudrun_gql_server/models"
	"github.com/volatiletech/null/v8"
)

func GenerateJWTToken(user *models.User) (string, error) {
	projectID, err := getGoogleProjectID()
	if err != nil {
		return "", fmt.Errorf("failed to get Google Project ID: %v", err)
	}

	expirationTime := time.Now().Add(1 * time.Hour)
	claims := &jwt.StandardClaims{
		Issuer:    projectID, // ここで projectID を設定
		Subject:   fmt.Sprint(user.ID.Int64),
		ExpiresAt: expirationTime.Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte("my-secret-key"))
	if err != nil {
		return "", fmt.Errorf("failed to sign JWT: %v", err)
	}

	return tokenString, nil
}

func getGoogleProjectID() (string, error) {
	// projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	// if projectID == "" {
	// 	return "", fmt.Errorf("missing GOOGLE_CLOUD_PROJECT environment variable")
	// }
	// return projectID, nil
	return "test", nil
}

// GetUserIDFromContext はコンテキストからユーザーIDを取得する関数です。
func GetUserIDFromContext(ctx context.Context) (null.Int64, error) {
	tokenString, ok := ctx.Value("token").(string)
	if !ok || tokenString == "" {
		return null.Int64{}, fmt.Errorf("unauthenticated")
	}

	claims := &jwt.StandardClaims{}
	_, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("my-secret-key"), nil // 秘密鍵を指定
	})
	if err != nil {
		return null.Int64{}, fmt.Errorf("invalid token: %v", err)
	}

	userID, err := strconv.ParseInt(claims.Subject, 10, 64)
	if err != nil {
		return null.Int64{}, fmt.Errorf("invalid user ID: %v", err)
	}

	return null.Int64From(userID), nil
}
