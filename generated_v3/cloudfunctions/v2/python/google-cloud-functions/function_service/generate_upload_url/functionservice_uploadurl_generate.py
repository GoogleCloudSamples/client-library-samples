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

# [START cloudfunctions_v2_functionservice_generate_upload_url]
from google.api_core import exceptions
from google.cloud import functions_v2


def generate_upload_url(project_id: str, location_id: str) -> None:
    """Generate a signed upload URL for Cloud Functions source code deployment.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id')
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1')
    """
    client = functions_v2.FunctionServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = functions_v2.GenerateUploadUrlRequest(
        parent=parent,
    )

    try:
        response = client.generate_upload_url(request=request)
        print(f"Generated upload URL: {response.upload_url}")
        print(f"Storage source bucket: {response.storage_source.bucket}")
        print(f"Storage source object: {response.storage_source.object_}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to generate upload URL: {e}")


# [END cloudfunctions_v2_functionservice_generate_upload_url]
