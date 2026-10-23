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

# This fixture enables the BigQuery Reservation API and provisions a Reservation Group.
# Note: us-west1 is used for live validation to avoid saturating the regional
# TotalAdminProjectsPerOrganization quota (default 10 projects per location) in us-central1.

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "bigqueryreservation" {
  project            = var.project_id
  service            = "bigqueryreservation.googleapis.com"
  disable_on_destroy = false
}

resource "google_bigquery_reservation_group" "default" {
  project  = var.project_id
  name     = "example-group-${random_id.default.hex}"
  location = "us-west1"

  depends_on = [google_project_service.bigqueryreservation]
}

output "location" {
  description = "The BigQuery Reservation Group location"
  value       = google_bigquery_reservation_group.default.location
}

output "reservation_group_id" {
  description = "The ID of the provisioned BigQuery Reservation Group"
  value       = google_bigquery_reservation_group.default.name
}
