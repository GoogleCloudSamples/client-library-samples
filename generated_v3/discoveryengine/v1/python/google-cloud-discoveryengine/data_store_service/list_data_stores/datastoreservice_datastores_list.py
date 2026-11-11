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

# [START discoveryengine_v1_datastoreservice_datastores_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1

client = discoveryengine_v1.DataStoreServiceClient()


def list_data_stores(project_id: str, location_id: str, collection_id: str) -> None:
    """Use the list_data_stores method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        collection_id: ID of the Collection (for example, 'example-collection-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}/collections/{collection_id}"

    try:
        request = discoveryengine_v1.ListDataStoresRequest(
            parent=parent,
        )
        response = client.list_data_stores(request=request)

        for data_store in response:
            print(f"Data store: {data_store.name}")
            print(f"Display name: {data_store.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END discoveryengine_v1_datastoreservice_datastores_list]
