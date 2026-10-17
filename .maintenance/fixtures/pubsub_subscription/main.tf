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

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "pubsub" {
  project            = var.project_id
  service            = "pubsub.googleapis.com"
  disable_on_destroy = false
}

resource "google_pubsub_topic" "default" {
  name    = "example-topic-${random_id.default.hex}"
  project = google_project_service.pubsub.project
}

resource "google_pubsub_subscription" "default" {
  name    = "example-subscription-${random_id.default.hex}"
  project = google_project_service.pubsub.project
  topic   = google_pubsub_topic.default.id
}

output "subscription_id" {
  description = "Pub/Sub subscription identifier"
  value       = google_pubsub_subscription.default.name
}
