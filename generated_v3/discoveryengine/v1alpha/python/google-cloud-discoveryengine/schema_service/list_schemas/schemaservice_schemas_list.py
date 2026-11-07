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

# [START discoveryengine_v1alpha_schemaservice_schemas_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha

client = discoveryengine_v1alpha.SchemaServiceClient()


def list_schemas(project_id: str, location_id: str, data_store_id: str) -> None:
    """Use the list_schemas method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
        data_store_id: The unique identifier of the DataStore.
    """
    parent = f"projects/{project_id}/locations/{location_id}/dataStores/{data_store_id}"

    request = discoveryengine_v1alpha.ListSchemasRequest(
        parent=parent,
    )

    try:
        response = client.list_schemas(request=request)
        for schema in response:
            print(f"Schema name: {schema.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list schemas: {e.message}")
# [END discoveryengine_v1alpha_schemaservice_schemas_list]
