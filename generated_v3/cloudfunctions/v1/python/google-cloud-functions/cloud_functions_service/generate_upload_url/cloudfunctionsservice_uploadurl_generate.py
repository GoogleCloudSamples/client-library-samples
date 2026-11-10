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

# [START cloudfunctions_v1_cloudfunctionsservice_generate_upload_url]
import google.api_core.exceptions
import google.auth
from google.cloud import functions_v1


def generate_upload_url() -> None:
    """Generates a signed upload URL for Cloud Functions source code."""
    _, project_id = google.auth.default()
    location = "us-central1"
    parent = f"projects/{project_id}/locations/{location}"

    client = functions_v1.CloudFunctionsServiceClient()
    request = functions_v1.GenerateUploadUrlRequest(
        parent=parent,
    )

    try:
        response = client.generate_upload_url(request=request)
        print(f"Generated upload URL: {response.upload_url}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to generate upload URL: {error}")
# [END cloudfunctions_v1_cloudfunctionsservice_generate_upload_url]
