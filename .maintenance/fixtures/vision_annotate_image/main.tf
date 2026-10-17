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

variable "location_id" {
  description = "Google Cloud Storage bucket location"
  type        = string
  default     = "US"
}

resource "random_id" "default" {
  byte_length = 2
}

resource "google_project_service" "vision" {
  project            = var.project_id
  service            = "vision.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "storage" {
  project            = var.project_id
  service            = "storage.googleapis.com"
  disable_on_destroy = false
}

resource "google_storage_bucket" "default" {
  name                        = "example-vision-bucket-${random_id.default.hex}"
  project                     = google_project_service.storage.project
  location                    = var.location_id
  uniform_bucket_level_access = true
  force_destroy               = true
}

resource "google_storage_bucket_object" "default" {
  name         = "example-image-${random_id.default.hex}.jpg"
  bucket       = google_storage_bucket.default.name
  content_type = "image/jpeg"
  source       = "${path.module}/dog.jpg"
}

output "gcs_uri" {
  description = "Cloud Storage URI of the test image object"
  value       = "gs://${google_storage_bucket.default.name}/${google_storage_bucket_object.default.name}"
}
