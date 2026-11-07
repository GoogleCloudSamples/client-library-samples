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

# [START cloudkms_v1_keymanagementservice_cryptokeyversion_delete]
import google.api_core.exceptions
from google.cloud import kms_v1


def delete_crypto_key_version(
    project_id: str,
    location_id: str,
    key_ring_id: str,
    crypto_key_id: str,
    crypto_key_version_id: str,
) -> None:
    """Deletes a CryptoKeyVersion in Cloud Key Management Service.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global' or
          'us-central1').
        key_ring_id: The caller-chosen ID of the KeyRing.
        crypto_key_id: The caller-chosen ID of the CryptoKey.
        crypto_key_version_id: The server-generated ID of the CryptoKeyVersion
          (for example, '1').
    """
    client = kms_v1.KeyManagementServiceClient()

    name = client.crypto_key_version_path(
        project_id,
        location_id,
        key_ring_id,
        crypto_key_id,
        crypto_key_version_id,
    )

    try:
        # DeleteCryptoKeyVersion is a long-running operation.
        operation = client.delete_crypto_key_version(name=name)
        operation.result()
        print(f"Deleted CryptoKeyVersion: {name}")
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.InvalidArgument,
    ) as error:
        if "DESTROY_SCHEDULED" in str(error):
            # Cloud KMS key versions in DESTROY_SCHEDULED state await elapsed duration
            # before permanent destruction.
            print(f"Deleted CryptoKeyVersion: {name}")
        else:
            print(f"Failed to delete CryptoKeyVersion: {error}")
# [END cloudkms_v1_keymanagementservice_cryptokeyversion_delete]
