
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


# TODO
# gcsバケットの作成(sqlite保存用)



resource "google_cloud_run_v2_service" "cloudrun_gql_server" {
  name     = "cloudrun-gql-server"
  location = local.location
  project  = local.project
  provider = google-beta
  launch_stage = "BETA"
  
  template {
    scaling {
      max_instance_count = 1
    }

    volumes {
      name = "sqlite"
      empty_dir {
        medium     = "MEMORY"
        size_limit = "128 Mi"
      }
    }
    containers {
      name = "gql-server"
      image = "${local.location}-docker.pkg.dev/${local.project}/repository/gql-server:latest"
      ports {
        container_port = 8080
      }
       depends_on = ["litestream"]
      volume_mounts {
        name       = "sqlite"
        read_only = false
        mount_path = "/sqlite"
      }
      env {
        name  = "FOO"
        value = "bar"
      }
      resources {
        limits = {
          # Memory usage limit (per container)
          memory = "512Mi"
        }
      }
    }

    containers {
      name = "litestream"
      image = "litestream/litestream:latest"
      volume_mounts {
        name       = "sqlite"
        read_only = false
        mount_path = "/sqlite"
      }
      env {
        name  = "FOO"
        value = "bar"
      }
      resources {
        limits = {
          # Memory usage limit (per container)
          memory = "512Mi"
        }
      }
    }
  }
  depends_on = [google_project_service.service]
}

resource "google_cloud_run_service_iam_binding" "cloudrun_gql_server" {
  location = google_cloud_run_v2_service.cloudrun_gql_server.location
  service  = google_cloud_run_v2_service.cloudrun_gql_server.name
  project  = local.project
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
  depends_on = [google_cloud_run_v2_service.cloudrun_gql_server]
}