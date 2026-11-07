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

# [START cloudkms_v1_keymanagementservice_cryptokey_update]
import google.api_core.exceptions
from google.cloud import kms_v1
from google.protobuf import field_mask_pb2


def update_crypto_key(
    project_id: str, location_id: str, key_ring_id: str, crypto_key_id: str
) -> None:
    """Updates the labels for a CryptoKey.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Cloud KMS location (for example, 'global' or 'us-central1').
        key_ring_id: The ID of the KeyRing containing the CryptoKey.
        crypto_key_id: The ID of the CryptoKey to update.
    """
    client = kms_v1.KeyManagementServiceClient()

    key_name = client.crypto_key_path(
        project_id, location_id, key_ring_id, crypto_key_id
    )

    update_mask = field_mask_pb2.FieldMask(paths=["labels"])
    crypto_key = kms_v1.CryptoKey(
        name=key_name,
        labels={"environment": "production"},
    )

    try:
        response = client.update_crypto_key(
            crypto_key=crypto_key,
            update_mask=update_mask,
        )
        print(f"Updated CryptoKey: {response.name}")
        print(f"Labels: {response.labels}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END cloudkms_v1_keymanagementservice_cryptokey_update]
