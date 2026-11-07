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

# [START discoveryengine_v1beta_datastoreservice_datastore_get]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.DataStoreServiceClient()


def get_data_store(project_id: str, location_id: str, data_store_id: str) -> None:
    """Retrieves metadata for a specific DataStore.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
        data_store_id: The unique identifier of the DataStore to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/dataStores/{data_store_id}"

    request = discoveryengine_v1beta.GetDataStoreRequest(name=name)

    try:
        response = client.get_data_store(request=request)
        print(f"Data store retrieved: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.NotFound:
        print(f"Data store not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e.message}")
# [END discoveryengine_v1beta_datastoreservice_datastore_get]
