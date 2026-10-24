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

# This fixture enables the BigQuery Reservation API and provisions a Reservation.
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

resource "google_bigquery_reservation" "default" {
  project           = var.project_id
  name              = "example-res-${random_id.default.hex}"
  location          = "us-west1"
  slot_capacity     = 0
  ignore_idle_slots = false

  depends_on = [google_project_service.bigqueryreservation]
}

resource "terraform_data" "cleanup_assignments" {
  input = {
    project_id     = var.project_id
    reservation_id = google_bigquery_reservation.default.name
  }

  provisioner "local-exec" {
    when    = destroy
    command = "for a in $(curl -s -H \"Authorization: Bearer $GOOGLE_OAUTH_ACCESS_TOKEN\" -H \"x-goog-user-project: ${self.input.project_id}\" \"https://bigqueryreservation.googleapis.com/v1/projects/${self.input.project_id}/locations/us-west1/reservations/${self.input.reservation_id}/assignments\" | grep -o 'projects/[^\"]*assignments/[0-9]*'); do curl -s -X DELETE -H \"Authorization: Bearer $GOOGLE_OAUTH_ACCESS_TOKEN\" -H \"x-goog-user-project: ${self.input.project_id}\" \"https://bigqueryreservation.googleapis.com/v1/$a\" >/dev/null 2>&1; done || true"
  }

  depends_on = [google_bigquery_reservation.default]
}

output "location" {
  description = "The BigQuery Reservation location"
  value       = google_bigquery_reservation.default.location
}

output "reservation_id" {
  description = "The ID of the provisioned BigQuery Reservation"
  value       = google_bigquery_reservation.default.name
}
