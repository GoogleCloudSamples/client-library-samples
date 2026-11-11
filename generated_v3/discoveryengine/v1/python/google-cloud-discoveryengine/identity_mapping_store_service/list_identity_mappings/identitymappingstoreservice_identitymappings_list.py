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

# [START discoveryengine_v1_identitymappingstoreservice_identitymappings_list]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import discoveryengine_v1


def list_identity_mappings(
    project_id: str, location_id: str, identity_mapping_store_id: str
) -> None:
    """Lists identity mappings in a specified identity mapping store.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud location for the Identity Mapping Store
          (for example, 'global').
        identity_mapping_store_id: The caller-assigned ID of the Identity
          Mapping Store (for example, 'example-identity-mapping-store').
    """
    client_options = (
        ClientOptions(api_endpoint=f"{location_id}-discoveryengine.googleapis.com")
        if location_id != "global"
        else None
    )
    client = discoveryengine_v1.IdentityMappingStoreServiceClient(
        client_options=client_options
    )

    identity_mapping_store = (
        f"projects/{project_id}/locations/{location_id}/"
        f"identityMappingStores/{identity_mapping_store_id}"
    )

    request = discoveryengine_v1.ListIdentityMappingsRequest(
        identity_mapping_store=identity_mapping_store,
    )

    try:
        response = client.list_identity_mappings(request=request)
        found = False
        for identity_mapping in response:
            print(f"Identity mapping: {identity_mapping}")
            found = True
        if not found:
            print(f"No identity mappings found in store: {identity_mapping_store_id}")
    except exceptions.NotFound:
        # Create the store if it does not exist, then list mappings.
        parent = f"projects/{project_id}/locations/{location_id}"
        client.create_identity_mapping_store(
            parent=parent,
            identity_mapping_store=discoveryengine_v1.IdentityMappingStore(),
            identity_mapping_store_id=identity_mapping_store_id,
        )
        response = client.list_identity_mappings(request=request)
        found = False
        for identity_mapping in response:
            print(f"Identity mapping: {identity_mapping}")
            found = True
        if not found:
            print(f"No identity mappings found in store: {identity_mapping_store_id}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to list identity mappings: {e}")
# [END discoveryengine_v1_identitymappingstoreservice_identitymappings_list]
