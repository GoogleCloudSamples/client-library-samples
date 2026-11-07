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

# [START cloudkms_v1_keymanagementservice_cryptokeyversions_list]
import google.api_core.exceptions
from google.cloud import kms_v1


def list_crypto_key_versions(
    project_id: str, location_id: str, key_ring_id: str, crypto_key_id: str
) -> None:
    """Lists versions of a CryptoKey in Cloud KMS.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        key_ring_id: ID of the KeyRing (for example, 'example-keyring-id').
        crypto_key_id: ID of the CryptoKey (for example, 'example-cryptokey-id').
    """
    client = kms_v1.KeyManagementServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/keyRings/"
        f"{key_ring_id}/cryptoKeys/{crypto_key_id}"
    )

    request = kms_v1.ListCryptoKeyVersionsRequest(parent=parent)

    try:
        response = client.list_crypto_key_versions(request=request)
        for version in response:
            print(f"Name: {version.name}")
            print(f"State: {version.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API request failed: {e}")
# [END cloudkms_v1_keymanagementservice_cryptokeyversions_list]
