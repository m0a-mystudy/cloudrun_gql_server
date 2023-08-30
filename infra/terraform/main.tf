# TODO
# gcsバケットの作成(sqlite保存用)

# 構築に必要なservice apiを有効化
locals {
  project = "m0a-dev"
}

locals {
  
  services = toset([
    "cloudresourcemanager.googleapis.com", // Cloud Resource Manager API
    "iam.googleapis.com",                  // Identity and Access Management (IAM) API
    # "containerregistry.googleapis.com", // Google Container Registry API
    # "cloudbuild.googleapis.com",        // Cloud Build API
    # "run.googleapis.com",               // Cloud Run API
    # "servicenetworking.googleapis.com", // Service Networking API
    # "vpcaccess.googleapis.com",         // Serverless VPC Access API
    # "cloudasset.googleapis.com",        // Cloud Asset API
    # "cloudscheduler.googleapis.com",    // Cloud Scheduler API
    # "servicecontrol.googleapis.com",    // Service Control API
    # "artifactregistry.googleapis.com",  // Artifact Registry API
    "identitytoolkit.googleapis.com" // Google Identity Toolkit API
  ])
}

resource "google_project_service" "service" {
  for_each = local.services
  project  = var.project
  service  = each.value
}

# authの有効化
resource "google_identity_platform_project_default_config" "default" {
    project = var.project
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
