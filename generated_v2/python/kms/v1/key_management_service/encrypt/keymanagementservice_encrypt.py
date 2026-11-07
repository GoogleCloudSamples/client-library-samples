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

# [START cloudkms_v1_keymanagementservice_encrypt]
import google.api_core.exceptions
from google.cloud import kms_v1


def encrypt(
    project_id: str, location_id: str, key_ring_id: str, crypto_key_id: str
) -> None:
    """Encrypts plaintext data using Cloud KMS.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Cloud KMS location ID (for example, 'global' or 'us-central1').
        key_ring_id: The caller-chosen identifier of the KeyRing.
        crypto_key_id: The caller-chosen identifier of the CryptoKey.
    """
    client = kms_v1.KeyManagementServiceClient()

    plaintext = b"example-plaintext"
    name = client.crypto_key_path(
        project_id, location_id, key_ring_id, crypto_key_id
    )

    try:
        response = client.encrypt(
            request={
                "name": name,
                "plaintext": plaintext,
            }
        )
        print(f"Encrypted ciphertext: {response.ciphertext}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error encrypting data: {error}")
# [END cloudkms_v1_keymanagementservice_encrypt]
