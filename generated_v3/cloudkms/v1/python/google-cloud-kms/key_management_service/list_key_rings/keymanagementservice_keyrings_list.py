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

# [START cloudkms_v1_keymanagementservice_keyrings_list]
import google.api_core.exceptions
from google.cloud import kms_v1


def list_key_rings(project_id: str, location_id: str) -> None:
    """Lists key rings in a given Google Cloud location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        client = kms_v1.KeyManagementServiceClient()
        request = kms_v1.ListKeyRingsRequest(parent=parent)
        page_result = client.list_key_rings(request=request)

        for key_ring in page_result:
            print(f"Name: {key_ring.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list key rings: {error}")
# [END cloudkms_v1_keymanagementservice_keyrings_list]
