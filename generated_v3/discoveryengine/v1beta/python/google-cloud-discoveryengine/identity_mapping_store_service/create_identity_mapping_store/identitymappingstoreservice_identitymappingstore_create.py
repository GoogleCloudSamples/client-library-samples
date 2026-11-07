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

# [START discoveryengine_v1beta_identitymappingstoreservice_identitymappingstore_create]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.IdentityMappingStoreServiceClient()


def create_identity_mapping_store(
    project_id: str, location_id: str, identity_mapping_store_id: str
) -> None:
    """Use the create_identity_mapping_store method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the service is located (for
          example, 'global' or 'us').
        identity_mapping_store_id: Caller-specified ID of the Identity Mapping
          Store to create. The ID must contain only letters (a-z, A-Z), numbers
          (0-9), underscores (_), and hyphens (-), with a maximum length of 63
          characters (for example, 'example-identity-mapping-store').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    identity_mapping_store = discoveryengine_v1beta.IdentityMappingStore()

    request = discoveryengine_v1beta.CreateIdentityMappingStoreRequest(
        parent=parent,
        identity_mapping_store=identity_mapping_store,
        identity_mapping_store_id=identity_mapping_store_id,
    )

    try:
        response = client.create_identity_mapping_store(request=request)
        print(f"Created Identity Mapping Store: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Operation failed with error: {e}")
# [END discoveryengine_v1beta_identitymappingstoreservice_identitymappingstore_create]
