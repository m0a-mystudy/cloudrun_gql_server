
# プロジェクト固有の設定
# credentialなものだけvariableに記載する
locals {
  project     = "m0a-dev"
  bucket_name = "m0a-dev-sqlite3-backup"
  location    = "asia-northeast1"
}

# 構築に必要なservice apiを有効化

locals {
  services = toset([
    "cloudresourcemanager.googleapis.com",
    "serviceusage.googleapis.com",
    "run.googleapis.com",
  ])
}

resource "google_project_service" "service" {
  for_each           = local.services
  project            = local.project
  service            = each.key
  disable_on_destroy = false
}


# Artifact Registry 設定
resource "google_artifact_registry_repository" "repository" {
  repository_id          = "repository"
  location               = "asia-northeast1"
  provider               = google-beta
  format                 = "DOCKER"
  project                = local.project
  cleanup_policy_dry_run = false

  
  cleanup_policies {
    id     = "keep-tagged-latest"
    action = "KEEP"
    condition {
      tag_state             = "TAGGED"
      tag_prefixes          = ["latest"]
    }
  }
  

  depends_on = [ google_project_service.service ]
}



