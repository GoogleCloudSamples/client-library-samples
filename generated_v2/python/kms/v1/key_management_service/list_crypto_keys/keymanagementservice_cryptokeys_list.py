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

# [START cloudkms_v1_keymanagementservice_cryptokeys_list]
import google.api_core.exceptions
from google.cloud import kms_v1


def list_crypto_keys(project_id: str, location_id: str, key_ring_id: str) -> None:
    """Lists Cloud KMS keys within a specified key ring.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the key ring resides (for example, 'global' or 'us-central1').
        key_ring_id: The identifier of the key ring (for example, 'example-keyring-id').
    """
    client = kms_v1.KeyManagementServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}/keyRings/{key_ring_id}"

    try:
        request = kms_v1.ListCryptoKeysRequest(
            parent=parent,
        )
        response = client.list_crypto_keys(request=request)

        for crypto_key in response:
            print(f"Key name: {crypto_key.name}")
            print(f"Key purpose: {crypto_key.purpose.name}")
    except google.api_core.exceptions.GoogleAPIError as error:
        print(f"API request failed: {error}")
# [END cloudkms_v1_keymanagementservice_cryptokeys_list]
