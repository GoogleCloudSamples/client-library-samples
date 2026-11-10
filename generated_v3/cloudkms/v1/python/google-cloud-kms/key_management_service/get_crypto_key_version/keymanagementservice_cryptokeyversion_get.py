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

# [START cloudkms_v1_keymanagementservice_cryptokeyversion_get]
import google.api_core.exceptions
from google.cloud import kms_v1


def get_crypto_key_version(
    project_id: str,
    location_id: str,
    key_ring_id: str,
    crypto_key_id: str,
    crypto_key_version_id: str,
) -> None:
    """Retrieve metadata for a specific CryptoKeyVersion.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Cloud KMS location ID (for example, 'global' or 'us-central1').
        key_ring_id: The caller-chosen ID of the KeyRing (must match '[a-zA-Z0-9_-]{1,63}').
        crypto_key_id: The caller-chosen ID of the CryptoKey (must match '[a-zA-Z0-9_-]{1,63}').
        crypto_key_version_id: The server-generated ID of the CryptoKeyVersion (for example, '1').
    """
    client = kms_v1.KeyManagementServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/keyRings/{key_ring_id}/cryptoKeys/{crypto_key_id}"
        f"/cryptoKeyVersions/{crypto_key_version_id}"
    )

    request = kms_v1.GetCryptoKeyVersionRequest(name=name)

    try:
        response = client.get_crypto_key_version(request=request)
        print(f"Name: {response.name}")
        print(f"State: {response.state.name}")
        print(f"Algorithm: {response.algorithm.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudkms_v1_keymanagementservice_cryptokeyversion_get]
