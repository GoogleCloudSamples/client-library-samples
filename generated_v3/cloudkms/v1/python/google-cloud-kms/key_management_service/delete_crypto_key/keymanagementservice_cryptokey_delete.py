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

# [START cloudkms_v1_keymanagementservice_cryptokey_delete]
import google.api_core.exceptions
from google.cloud import kms_v1


def delete_crypto_key(
    project_id: str, location_id: str, key_ring_id: str, crypto_key_id: str
) -> None:
    """Delete a CryptoKey using Cloud Key Management Service.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Cloud KMS location ID (for example, 'global' or 'us-central1').
        key_ring_id: The ID of the parent KeyRing.
        crypto_key_id: The ID of the CryptoKey to delete.
    """
    client = kms_v1.KeyManagementServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/keyRings/{key_ring_id}/cryptoKeys/{crypto_key_id}"
    request = kms_v1.DeleteCryptoKeyRequest(name=name)

    try:
        # DeleteCryptoKey initiates a long-running operation
        operation = client.delete_crypto_key(request=request)
        operation.result()
        print(f"Deleted CryptoKey: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Deletion failed: {error}")
# [END cloudkms_v1_keymanagementservice_cryptokey_delete]
