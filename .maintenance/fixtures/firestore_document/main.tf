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

resource "google_project_service" "firestore" {
  project            = var.project_id
  service            = "firestore.googleapis.com"
  disable_on_destroy = false
}

resource "google_firestore_document" "default" {
  project     = google_project_service.firestore.project
  database    = "(default)"
  collection  = "example-collection-${random_id.default.hex}"
  document_id = "example-document-${random_id.default.hex}"
  fields      = "{\"environment\":{\"stringValue\":\"production\"}}"
}

output "collection_id" {
  description = "Firestore collection identifier"
  value       = google_firestore_document.default.collection
}

output "document_id" {
  description = "Firestore document identifier"
  value       = google_firestore_document.default.document_id
}
