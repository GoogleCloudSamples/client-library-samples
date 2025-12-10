# This fixture creates fixtures across two products:
# * A Cloud Storage bucket, containing a CSV object.
# * A BigQuery Dataset, containing a table with a schema matching the CSV object.
# * An IAM Service Account to use to own the transfer config. Required to prevent user OAuth interaction when testing

variable "project_id" {
  description = "Google Cloud Project ID"
}

resource "random_id" "default" {
  byte_length = 2
}

# Destination data

resource "google_bigquery_dataset" "default" {
  project     = var.project_id
  dataset_id  = "my_dataset_${random_id.default.hex}"
  description = "CI Dataset Fixture"
  location    = "us-central1"

}

resource "google_bigquery_table" "default" {
  project             = var.project_id
  dataset_id          = google_bigquery_dataset.default.dataset_id
  table_id            = "my_table_${random_id.default.hex}"
  deletion_protection = false

  schema = <<EOF
[
  {
    "name": "name",
    "type": "STRING"
  },
  {
    "name": "post_abbr",
    "type": "STRING"
  }
]
EOF

}

# Source data

resource "google_storage_bucket" "default" {
  name          = "my_bucket_${random_id.default.hex}_${var.project_id}"
  location      = "us-central1"
  force_destroy = true

  public_access_prevention = "enforced"
}

resource "google_storage_bucket_object" "default" {
  bucket = google_storage_bucket.default.name
  name   = "us-states.csv"
  source = "us-states.csv"
}

# Service account with permissions to use for automated execution

resource "google_service_account" "default" {
  account_id   = "bigquery-transferconfig"
}

resource "google_project_iam_member" "default" {
  project    = var.project_id
  role       = "roles/bigquery.admin"
  member     = "serviceAccount:${google_service_account.default.email}"
}

output "dataset_id" {
  value = google_bigquery_dataset.default.dataset_id
}

output "table_id" {
  value = google_bigquery_table.default.table_id
}

output "datasource_uri" {
  value = "gs://${google_storage_bucket_object.default.bucket}/${google_storage_bucket_object.default.name}"
}

output "service_account_email" {
  value = google_service_account.default.email
}
