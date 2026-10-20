# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This fixture creates fixtures across two products:
# * A Cloud Storage bucket, containing a CSV object.
# * A BigQuery Dataset, containing a table with a schema matching the CSV object.
# * An IAM Service Account to use to own the transfer config. Required to prevent user OAuth interaction when testing.

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "bigquerydatatransfer" {
  project            = var.project_id
  service            = "bigquerydatatransfer.googleapis.com"
  disable_on_destroy = false
}

# Destination data

resource "google_bigquery_dataset" "default" {
  project                    = var.project_id
  dataset_id                 = "example_dataset_${random_id.default.hex}"
  description                = "CI Dataset Fixture"
  location                   = "us-central1"
  delete_contents_on_destroy = true
}

resource "google_bigquery_table" "default" {
  project             = var.project_id
  dataset_id          = google_bigquery_dataset.default.dataset_id
  table_id            = "example_table_${random_id.default.hex}"
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
  project       = var.project_id
  name          = "example_bucket_${random_id.default.hex}_${var.project_id}"
  location      = "us-central1"
  force_destroy = true

  public_access_prevention = "enforced"
}

resource "google_storage_bucket_object" "default" {
  bucket = google_storage_bucket.default.name
  name   = "us-states-${random_id.default.hex}.csv"
  source = "us-states.csv"
}

# Service account with permissions to use for automated execution

resource "google_service_account" "default" {
  project    = var.project_id
  account_id = "bq-transferconfig-${random_id.default.hex}"
}

resource "google_project_iam_member" "default" {
  project    = var.project_id
  role       = "roles/bigquery.admin"
  member     = "serviceAccount:bq-transferconfig-${random_id.default.hex}@${var.project_id}.iam.gserviceaccount.com"
  depends_on = [google_service_account.default]
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
