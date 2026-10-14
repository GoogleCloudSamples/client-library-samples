variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "pubsub" {
  project            = var.project_id
  service            = "pubsub.googleapis.com"
  disable_on_destroy = false
}

resource "google_pubsub_topic" "default" {
  name    = "example-topic-${random_id.default.hex}"
  project = google_project_service.pubsub.project
}

output "topic_id" {
  description = "Pub/Sub topic identifier"
  value       = google_pubsub_topic.default.name
}
