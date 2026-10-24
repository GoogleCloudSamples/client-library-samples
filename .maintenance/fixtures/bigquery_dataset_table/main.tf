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

# This fixture creates a BigQuery Dataset and Table within that dataset.

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "bigquery" {
  project            = var.project_id
  service            = "bigquery.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "bigquerystorage" {
  project            = var.project_id
  service            = "bigquerystorage.googleapis.com"
  disable_on_destroy = false
}

resource "google_bigquery_dataset" "default" {
  project     = var.project_id
  dataset_id  = "example_dataset_${random_id.default.hex}"
  description = "CI Dataset Fixture"
  location    = "us-central1"

  depends_on = [
    google_project_service.bigquery,
    google_project_service.bigquerystorage,
  ]
}

resource "google_bigquery_table" "default" {
  project             = var.project_id
  dataset_id          = google_bigquery_dataset.default.dataset_id
  table_id            = "example_table_${random_id.default.hex}"
  deletion_protection = false

  schema = <<EOF
[
  {
    "name": "field_01",
    "type": "STRING"
  },
  {
    "name": "field_02",
    "type": "STRING"
  },
  {
    "name": "field_03",
    "type": "INTEGER"
  }
]
EOF
}

output "dataset_id" {
  value = google_bigquery_dataset.default.dataset_id
}

output "table_id" {
  value = google_bigquery_table.default.table_id
}
