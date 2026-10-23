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

# This fixture enables the BigQuery Data Transfer API and provisions a scheduled query transfer config.

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

resource "google_bigquery_dataset" "default" {
  project                    = var.project_id
  dataset_id                 = "example_dataset_${random_id.default.hex}"
  description                = "CI Dataset Fixture"
  location                   = "us-central1"
  delete_contents_on_destroy = true
}

resource "google_service_account" "default" {
  project    = var.project_id
  account_id = "bq-transferconfig-${random_id.default.hex}"
}

resource "google_project_iam_member" "bigquery_admin" {
  project    = var.project_id
  role       = "roles/bigquery.admin"
  member     = google_service_account.default.member
}

resource "google_bigquery_data_transfer_config" "default" {
  project                = var.project_id
  display_name           = "example_transfer_config_${random_id.default.hex}"
  location               = "us-central1"
  data_source_id         = "scheduled_query"
  schedule               = "every 24 hours"
  destination_dataset_id = google_bigquery_dataset.default.dataset_id
  service_account_name   = google_service_account.default.email

  params = {
    destination_table_name_template = "example_table_${random_id.default.hex}"
    write_disposition               = "WRITE_APPEND"
    query                           = "SELECT 'example' AS name"
  }

  depends_on = [
    google_project_service.bigquerydatatransfer,
    google_project_iam_member.bigquery_admin,
  ]
}

output "transfer_config_id" {
  value = element(split("/", google_bigquery_data_transfer_config.default.name), length(split("/", google_bigquery_data_transfer_config.default.name)) - 1)
}
