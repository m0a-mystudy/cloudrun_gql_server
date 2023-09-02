package auth

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/m0a/cloudrun_gql_server/models"
)

func GenerateJWTToken(user *models.User) (string, error) {
	projectID, err := getGoogleProjectID()
	if err != nil {
		return "", fmt.Errorf("failed to get Google Project ID: %v", err)
	}

	expirationTime := time.Now().Add(1 * time.Hour)
	claims := &jwt.StandardClaims{
		Issuer:    projectID, // ここで projectID を設定
		Subject:   fmt.Sprint(user.ID),
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
