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

# [START cloudkms_v1_keymanagementservice_cryptokey_create]
import google.api_core.exceptions
from google.cloud import kms_v1


def create_crypto_key(
    crypto_key_id: str, project_id: str, location_id: str, key_ring_id: str
) -> None:
    """Create a new CryptoKey within a KeyRing.

    Args:
        crypto_key_id: Caller-chosen identifier for the new CryptoKey.
        project_id: The Google Cloud project ID where the KeyRing is located.
        location_id: The Cloud KMS location ID (for example, 'global' or
          'us-central1').
        key_ring_id: The identifier of the existing KeyRing in which to create
          the CryptoKey.
    """
    client = kms_v1.KeyManagementServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/keyRings/{key_ring_id}"

    crypto_key = kms_v1.CryptoKey(
        purpose=kms_v1.CryptoKey.CryptoKeyPurpose.ENCRYPT_DECRYPT,
        version_template=kms_v1.CryptoKeyVersionTemplate(
            algorithm=kms_v1.CryptoKeyVersion.CryptoKeyVersionAlgorithm.GOOGLE_SYMMETRIC_ENCRYPTION
        ),
    )

    try:
        response = client.create_crypto_key(
            parent=parent,
            crypto_key_id=crypto_key_id,
            crypto_key=crypto_key,
        )
        print(f"Created crypto key: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create crypto key: {e}")
# [END cloudkms_v1_keymanagementservice_cryptokey_create]
