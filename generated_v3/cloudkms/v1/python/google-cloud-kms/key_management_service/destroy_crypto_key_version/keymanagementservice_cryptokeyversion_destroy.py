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

# [START cloudkms_v1_keymanagementservice_cryptokeyversion_destroy]
import google.api_core.exceptions
from google.cloud import kms_v1


def destroy_crypto_key_version(
    project_id: str,
    location_id: str,
    key_ring_id: str,
    crypto_key_id: str,
    crypto_key_version_id: str,
) -> None:
    """Schedules a CryptoKeyVersion for destruction.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Cloud KMS location (for example, 'global' or 'us-central1').
        key_ring_id: The identifier of the KeyRing.
        crypto_key_id: The identifier of the CryptoKey.
        crypto_key_version_id: The sequential identifier of the CryptoKeyVersion (for example, '1').
    """
    client = kms_v1.KeyManagementServiceClient()

    name = client.crypto_key_version_path(
        project_id,
        location_id,
        key_ring_id,
        crypto_key_id,
        crypto_key_version_id,
    )

    request = kms_v1.DestroyCryptoKeyVersionRequest(
        name=name,
    )

    try:
        response = client.destroy_crypto_key_version(request=request)
        print(f"Scheduled destruction for key version: {response.name}")
        print(f"Current state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudkms_v1_keymanagementservice_cryptokeyversion_destroy]
