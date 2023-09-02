
output "cloudrun_gqlerver_url" {
  value = google_cloud_run_v2_service.cloudrun_gql_server.uri
}