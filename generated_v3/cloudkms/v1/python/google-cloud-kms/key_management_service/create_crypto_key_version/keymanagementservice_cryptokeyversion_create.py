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

# [START cloudkms_v1_keymanagementservice_cryptokeyversion_create]
import google.api_core.exceptions
from google.cloud import kms_v1


def create_crypto_key_version(
    project_id: str, location_id: str, key_ring_id: str, crypto_key_id: str
) -> None:
    """Create a new version for an existing CryptoKey.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, 'global').
        key_ring_id: The identifier of the existing KeyRing.
        crypto_key_id: The identifier of the existing CryptoKey.
    """
    client = kms_v1.KeyManagementServiceClient()

    parent = client.crypto_key_path(
        project_id, location_id, key_ring_id, crypto_key_id
    )
    crypto_key_version = kms_v1.CryptoKeyVersion()

    try:
        response = client.create_crypto_key_version(
            parent=parent,
            crypto_key_version=crypto_key_version,
        )
        print(f"Created CryptoKeyVersion: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END cloudkms_v1_keymanagementservice_cryptokeyversion_create]
