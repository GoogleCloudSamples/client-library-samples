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

data "google_client_config" "default" {}

data "http" "create_reservation_group" {
  url    = "https://bigqueryreservation.googleapis.com/v1/projects/${var.project_id}/locations/us-west1/reservationGroups?reservationGroupId=example-group-${random_id.default.hex}"
  method = "POST"

  request_headers = {
    Authorization       = "Bearer ${data.google_client_config.default.access_token}"
    Content-Type        = "application/json"
    x-goog-user-project = var.project_id
  }

  request_body = "{}"

  depends_on = [google_project_service.bigqueryreservation]
}

resource "terraform_data" "cleanup_group" {
  input = {
    project_id           = var.project_id
    reservation_group_id = "example-group-${random_id.default.hex}"
  }

  provisioner "local-exec" {
    when    = destroy
    command = "curl -s -X DELETE -H \"Authorization: Bearer $GOOGLE_OAUTH_ACCESS_TOKEN\" -H \"x-goog-user-project: ${self.input.project_id}\" \"https://bigqueryreservation.googleapis.com/v1/projects/${self.input.project_id}/locations/us-west1/reservationGroups/${self.input.reservation_group_id}\" >/dev/null 2>&1 || true"
  }

  depends_on = [data.http.create_reservation_group]
}

output "location" {
  description = "The BigQuery Reservation Group location"
  value       = "us-west1"
}

output "reservation_group_id" {
  description = "The ID of the provisioned BigQuery Reservation Group"
  value       = terraform_data.cleanup_group.input.reservation_group_id
}
