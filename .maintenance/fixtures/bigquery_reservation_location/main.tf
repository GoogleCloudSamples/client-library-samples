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

# This fixture enables the BigQuery Reservation API and outputs a target location.
# Note: BigQuery Reservations enforces a regional quota on the number of reservation
# admin projects per organization (TotalAdminProjectsPerOrganization, default 10 per
# location). In shared playground organizations where us-central1 may be at the 10-project
# limit, us-west1 is used for live validation while sample code defaults to us-central1.

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "google_project_service" "bigqueryreservation" {
  project            = var.project_id
  service            = "bigqueryreservation.googleapis.com"
  disable_on_destroy = false
}

resource "google_bigquery_bi_reservation" "default" {
  project  = var.project_id
  location = "us-west1"
  size     = 0

  depends_on = [google_project_service.bigqueryreservation]
}

output "location" {
  description = "The BigQuery Reservation location"
  value       = google_bigquery_bi_reservation.default.location
}
