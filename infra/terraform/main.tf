# TODO
# gcsバケットの作成(sqlite保存用)

# 構築に必要なservice apiを有効化
locals {
  project = "m0a-dev"
}

locals {
  
  services = toset([
    "iam.googleapis.com",                  // Identity and Access Management (IAM) API
    "cloudbilling.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "firebase.googleapis.com",
    "serviceusage.googleapis.com",
    "identitytoolkit.googleapis.com" // Google Identity Toolkit API
  ])
}

resource "google_project_service" "service" {
  for_each = local.services
  project  = local.project
  service  = each.key
  disable_on_destroy = false
}

# authの有効化
resource "google_identity_platform_project_default_config" "default" {
    project = local.project
    sign_in {
        allow_duplicate_emails = false

        email {
            enabled = true
            password_required = false
        }
    }
}

# cloud runの作成
# 
