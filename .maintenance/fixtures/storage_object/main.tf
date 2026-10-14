variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

variable "location_id" {
  description = "Cloud Storage bucket location"
  type        = string
  default     = "US"
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "storage" {
  project            = var.project_id
  service            = "storage.googleapis.com"
  disable_on_destroy = false
}

resource "google_storage_bucket" "default" {
  name                        = "example-bucket-${random_id.default.hex}"
  project                     = google_project_service.storage.project
  location                    = var.location_id
  uniform_bucket_level_access = true
  force_destroy               = true
}

resource "google_storage_bucket_object" "default" {
  name         = "example-object-${random_id.default.hex}.txt"
  bucket       = google_storage_bucket.default.name
  content_type = "text/plain"
  content      = "Example object payload for Cloud Storage validation."
}

output "bucket_name" {
  description = "Cloud Storage bucket name"
  value       = google_storage_bucket.default.name
}

output "object_name" {
  description = "Cloud Storage object name"
  value       = google_storage_bucket_object.default.name
}
