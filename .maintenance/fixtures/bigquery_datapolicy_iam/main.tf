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

# This fixture enables the BigQuery Data Policy API, provisions a Data Masking Policy,
# and creates an ephemeral Service Account to test IAM V1 policy operations.

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "bigquerydatapolicy" {
  project            = var.project_id
  service            = "bigquerydatapolicy.googleapis.com"
  disable_on_destroy = false
}

resource "google_service_account" "default" {
  project    = var.project_id
  account_id = "bq-datapolicy-sa-${random_id.default.hex}"
}

resource "google_bigquery_datapolicyv2_data_policy" "default" {
  project          = var.project_id
  location         = "us-central1"
  data_policy_id   = "example_data_policy_${random_id.default.hex}"
  data_policy_type = "DATA_MASKING_POLICY"

  data_masking_policy {
    predefined_expression = "ALWAYS_NULL"
  }

  depends_on = [google_project_service.bigquerydatapolicy]
}

output "data_policy_id" {
  description = "The ID of the provisioned BigQuery Data Policy"
  value       = google_bigquery_datapolicyv2_data_policy.default.data_policy_id
}

output "member" {
  description = "IAM V1 member identifier for the ephemeral service account"
  value       = "serviceAccount:${google_service_account.default.email}"
}
