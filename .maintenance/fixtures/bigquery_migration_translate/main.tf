# This fixture creates:
# * A Cloud Storage bucket, containing a txt object, for input
# * A Cloud Storage bucket for output.

variable "project_id" {
  description = "Google Cloud Project ID"
}

resource "random_id" "default" {
  byte_length = 2
}

locals {
  input_path  = "input/"
  output_path = "output/"
}

# Source data

resource "google_storage_bucket" "default" {
    project = var.project_id
  name          = "fixture_translation_${random_id.default.hex}_${var.project_id}"
  location      = "us-central1"
  force_destroy = true

  public_access_prevention = "enforced"
}

resource "google_storage_bucket_object" "default" {
  bucket = google_storage_bucket.default.name
  name   = "input/input_sql.txt"
  source = "input_sql.txt"
}

# output parameters

output "gcs_source_path" {
  value = "gs://${google_storage_bucket_object.default.bucket}/${local.input_path}"
}

output "gcs_target_path" {
  value = "gs://${google_storage_bucket_object.default.bucket}/${local.output_path}"
}
