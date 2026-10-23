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

# This fixture provisions a Secret Manager secret and a Pub/Sub topic configured for secret notifications.

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "secretmanager" {
  project            = var.project_id
  service            = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "pubsub" {
  project            = var.project_id
  service            = "pubsub.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service_identity" "secretmanager_identity" {
  provider = google-beta
  project  = var.project_id
  service  = google_project_service.secretmanager.service
}

resource "google_pubsub_topic" "default" {
  project    = var.project_id
  name       = "example-secret-topic-${random_id.default.hex}"
  depends_on = [google_project_service.pubsub]
}

resource "google_pubsub_topic_iam_member" "secretmanager_publisher" {
  project = var.project_id
  topic   = google_pubsub_topic.default.name
  role    = "roles/pubsub.publisher"
  member  = google_project_service_identity.secretmanager_identity.member
}

resource "google_secret_manager_secret" "default" {
  project   = var.project_id
  secret_id = "example-secret-${random_id.default.hex}"

  replication {
    auto {}
  }

  depends_on = [google_project_service.secretmanager]
}

output "resource_name" {
  description = "The resource name of the provisioned secret"
  value       = google_secret_manager_secret.default.name
}

output "topic_name" {
  description = "The full resource name of the provisioned Pub/Sub topic"
  value       = google_pubsub_topic.default.id
}
