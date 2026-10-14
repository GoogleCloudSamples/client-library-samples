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

output "bucket_name" {
  description = "Cloud Storage bucket name"
  value       = google_storage_bucket.default.name
}
