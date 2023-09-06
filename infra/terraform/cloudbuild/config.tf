terraform {
  backend "gcs" {
    bucket = "m0a-dev-tfstate"
    prefix = "cloudbuild"
  }
}