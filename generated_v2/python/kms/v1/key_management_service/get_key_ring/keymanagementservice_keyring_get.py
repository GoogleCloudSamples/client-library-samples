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

# [START cloudkms_v1_keymanagementservice_keyring_get]
from google.api_core import exceptions
from google.cloud import kms_v1


def get_key_ring(project_id: str, location_id: str, key_ring_id: str) -> None:
    """Retrieve metadata for a KeyRing in Cloud Key Management Service.

    Args:
        project_id: The Google Cloud project ID hosting the KeyRing.
        location_id: The Cloud KMS location ID (for example, 'global').
        key_ring_id: The caller-chosen identifier of the KeyRing to retrieve.
    """
    client = kms_v1.KeyManagementServiceClient()

    name = client.key_ring_path(project_id, location_id, key_ring_id)

    request = kms_v1.GetKeyRingRequest(name=name)

    try:
        response = client.get_key_ring(request=request)
        print(f"Retrieved key ring: {response.name}")
        print(f"Create time: {response.create_time}")
    except exceptions.NotFound:
        print(f"Key ring not found: {name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudkms_v1_keymanagementservice_keyring_get]
