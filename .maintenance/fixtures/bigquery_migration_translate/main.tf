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

# This fixture creates:
# * A Cloud Storage bucket, containing a txt object, for input
# * A Cloud Storage bucket for output.

variable "project_id" {
  description = "Google Cloud Project ID"
}

resource "random_id" "default" {
  byte_length = 2
}

locals {
  input_path  = "input/"
  output_path = "output/"
}

# Source data

resource "google_storage_bucket" "default" {
    project = var.project_id
  name          = "fixture_translation_${random_id.default.hex}_${var.project_id}"
  location      = "us-central1"
  force_destroy = true

  public_access_prevention = "enforced"
}

resource "google_storage_bucket_object" "default" {
  bucket = google_storage_bucket.default.name
  name   = "input/input_sql.txt"
  source = "input_sql.txt"
}

# output parameters

output "gcs_source_path" {
  value = "gs://${google_storage_bucket_object.default.bucket}/${local.input_path}"
}

output "gcs_target_path" {
  value = "gs://${google_storage_bucket_object.default.bucket}/${local.output_path}"
}
