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

# [START discoveryengine_v1_identitymappingstoreservice_identitymappingstores_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1


def list_identity_mapping_stores(project_id: str, location_id: str) -> None:
    """Lists identity mapping stores in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (for example, 'global').
    """
    client = discoveryengine_v1.IdentityMappingStoreServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = discoveryengine_v1.ListIdentityMappingStoresRequest(
        parent=parent,
    )

    try:
        response = client.list_identity_mapping_stores(request=request)
        has_stores = False
        for identity_mapping_store in response:
            print(f"Identity mapping store name: {identity_mapping_store.name}")
            has_stores = True

        if not has_stores:
            print(f"No identity mapping stores found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Listing identity mapping stores failed: {error}")
# [END discoveryengine_v1_identitymappingstoreservice_identitymappingstores_list]
