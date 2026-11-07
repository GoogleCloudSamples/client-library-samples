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

# [START cloudkms_v1_keymanagementservice_cryptokey_get]
import google.api_core.exceptions
from google.cloud import kms_v1


def get_crypto_key(
    project_id: str, location_id: str, key_ring_id: str, crypto_key_id: str
) -> None:
    """Retrieves metadata for an existing Cloud KMS CryptoKey.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Cloud KMS location, for example, 'global' or 'us-central1'.
        key_ring_id: The identifier of the KeyRing.
        crypto_key_id: The identifier of the CryptoKey to retrieve.
    """
    # Create the Cloud KMS client.
    client = kms_v1.KeyManagementServiceClient()

    # Construct the CryptoKey resource name.
    name = client.crypto_key_path(
        project_id, location_id, key_ring_id, crypto_key_id
    )

    try:
        crypto_key = client.get_crypto_key(name=name)
        print(f"Retrieved CryptoKey: {crypto_key.name}")
        print(f"Key purpose: {crypto_key.purpose.name}")
        print(f"Primary version state: {crypto_key.primary.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to retrieve CryptoKey: {exc}")
# [END cloudkms_v1_keymanagementservice_cryptokey_get]
