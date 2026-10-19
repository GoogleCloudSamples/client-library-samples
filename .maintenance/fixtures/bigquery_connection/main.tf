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

# This fixture enables the BigQuery Connection API and provisions a Cloud Resource connection.

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "bigqueryconnection" {
  project            = var.project_id
  service            = "bigqueryconnection.googleapis.com"
  disable_on_destroy = false
}

resource "google_bigquery_connection" "default" {
  project       = var.project_id
  connection_id = "my_connection_${random_id.default.hex}"
  location      = "us-central1"
  friendly_name = "Example Connection"
  description   = "Cloud Resource connection fixture"

  cloud_resource {}

  depends_on = [google_project_service.bigqueryconnection]
}

output "connection_id" {
  value = google_bigquery_connection.default.connection_id
}
