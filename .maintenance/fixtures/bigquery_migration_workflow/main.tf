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

# This fixture enables the BigQuery Migration API, creates a Cloud Storage bucket
# with an input SQL object, and creates a BigQuery Migration workflow.

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "bigquerymigration" {
  project            = var.project_id
  service            = "bigquerymigration.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "storage" {
  project            = var.project_id
  service            = "storage.googleapis.com"
  disable_on_destroy = false
}

resource "google_storage_bucket" "default" {
  project       = var.project_id
  name          = "example_workflow_${random_id.default.hex}_${var.project_id}"
  location      = "us-central1"
  force_destroy = true

  public_access_prevention    = "enforced"
  uniform_bucket_level_access = true

  depends_on = [
    google_project_service.bigquerymigration,
    google_project_service.storage,
  ]
}

resource "google_storage_bucket_object" "default" {
  bucket  = google_storage_bucket.default.name
  name    = "input/input_sql.txt"
  content = "SELECT 1;\n"
}

data "google_client_config" "default" {}

data "http" "create_workflow" {
  url    = "https://bigquerymigration.googleapis.com/v2/projects/${var.project_id}/locations/us/workflows"
  method = "POST"

  request_headers = {
    Authorization = "Bearer ${data.google_client_config.default.access_token}"
    Content-Type  = "application/json"
  }

  request_body = jsonencode({
    displayName = "example-migration-workflow-${random_id.default.hex}"
    tasks = {
      "translation-task" = {
        type = "Translation_Teradata2BQ"
        translationConfigDetails = {
          gcsSourcePath = "gs://${google_storage_bucket_object.default.bucket}/input/"
          gcsTargetPath = "gs://${google_storage_bucket_object.default.bucket}/output/"
          sourceDialect = {
            teradataDialect = {
              mode = "SQL"
            }
          }
          targetDialect = {
            bigqueryDialect = {}
          }
        }
      }
    }
  })
}

locals {
  workflow_name       = jsondecode(data.http.create_workflow.response_body).name
  workflow_name_parts = split("/", local.workflow_name)
}

output "workflow_id" {
  value = element(local.workflow_name_parts, length(local.workflow_name_parts) - 1)
}
