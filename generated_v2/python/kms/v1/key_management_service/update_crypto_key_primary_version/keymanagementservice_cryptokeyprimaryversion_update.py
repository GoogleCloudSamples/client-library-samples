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

# [START cloudkms_v1_keymanagementservice_cryptokeyprimaryversion_update]
from google.api_core import exceptions
from google.cloud import kms_v1


def update_crypto_key_primary_version(
    crypto_key_version_id: str,
    project_id: str,
    location_id: str,
    key_ring_id: str,
    crypto_key_id: str,
) -> None:
    """Update the primary version of a CryptoKey.

    Args:
        crypto_key_version_id: The server-generated ID of the CryptoKeyVersion
          to use as primary (for example, '2').
        project_id: The Google Cloud project ID.
        location_id: The location ID (for example, 'global').
        key_ring_id: The identifier of the KeyRing (for example,
          'example-key-ring').
        crypto_key_id: The identifier of the CryptoKey (for example,
          'example-crypto-key').
    """
    client = kms_v1.KeyManagementServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"keyRings/{key_ring_id}/cryptoKeys/{crypto_key_id}"
    )

    try:
        response = client.update_crypto_key_primary_version(
            name=name,
            crypto_key_version_id=crypto_key_version_id,
        )
        print(f"Updated primary version: {response.primary.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to update primary version: {error}")
# [END cloudkms_v1_keymanagementservice_cryptokeyprimaryversion_update]
