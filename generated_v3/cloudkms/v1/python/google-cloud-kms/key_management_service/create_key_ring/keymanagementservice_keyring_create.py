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

# [START cloudkms_v1_keymanagementservice_keyring_create]
import google.api_core.exceptions
from google.cloud import kms_v1


def create_key_ring(project_id: str, location_id: str, key_ring_id: str) -> None:
    """Create a Cloud KMS key ring in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        key_ring_id: The identifier of the KeyRing (for example, 'example-keyring-id').
    """
    # Specify the quota project to route API enablement and billing to the target project.
    client = kms_v1.KeyManagementServiceClient(
        client_options={"quota_project_id": project_id}
    )

    parent = client.common_location_path(project_id, location_id)
    key_ring = kms_v1.KeyRing()

    try:
        response = client.create_key_ring(
            request={
                "parent": parent,
                "key_ring_id": key_ring_id,
                "key_ring": key_ring,
            }
        )
        print(f"Created key ring: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudkms_v1_keymanagementservice_keyring_create]
