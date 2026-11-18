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

# [START kmsinventory_v1_keydashboardservice_cryptokeys_list]
import google.api_core.exceptions
from google.cloud import kms_inventory_v1


def list_crypto_keys(project_id: str) -> None:
    """Lists Cloud KMS keys within a project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = kms_inventory_v1.KeyDashboardServiceClient()

    parent = f"projects/{project_id}"

    request = kms_inventory_v1.ListCryptoKeysRequest(parent=parent)

    try:
        response = client.list_crypto_keys(request=request)
        for crypto_key in response:
            print(f"CryptoKey name: {crypto_key.name}")
            if crypto_key.primary:
                print(f"Primary version state: {crypto_key.primary.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list crypto keys: {error}")
# [END kmsinventory_v1_keydashboardservice_cryptokeys_list]
