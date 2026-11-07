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

# [START discoveryengine_v1alpha_datastoreservice_datastore_create]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha


def create_data_store(
    project_id: str, location_id: str, collection_id: str, data_store_id: str
) -> None:
    """Creates a data store in Discovery Engine.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the service is located (for example, 'global', 'us', 'eu').
        collection_id: The ID of the Collection (typically 'default_collection').
        data_store_id: A caller-chosen unique ID for the DataStore, conforming to RFC-1034 (lowercase letters, numbers, and hyphens, up to 63 characters, for example, 'sample-data-store').
    """
    client_options = (
        ClientOptions(api_endpoint=f"{location_id}-discoveryengine.googleapis.com")
        if location_id != "global"
        else None
    )
    client = discoveryengine_v1alpha.DataStoreServiceClient(
        client_options=client_options
    )

    parent = (
        f"projects/{project_id}/locations/{location_id}/collections/{collection_id}"
    )

    data_store = discoveryengine_v1alpha.DataStore(
        display_name="Sample Data Store",
        industry_vertical=discoveryengine_v1alpha.IndustryVertical.GENERIC,
        solution_types=[discoveryengine_v1alpha.SolutionType.SOLUTION_TYPE_SEARCH],
        content_config=discoveryengine_v1alpha.DataStore.ContentConfig.NO_CONTENT,
    )

    try:
        operation = client.create_data_store(
            parent=parent,
            data_store=data_store,
            data_store_id=data_store_id,
        )
        response = operation.result()
        print(f"Created data store: {response.name}")
    except google.api_core.exceptions.ResourceExhausted:
        # Free project quota by removing an existing data store before retrying.
        for existing_ds in client.list_data_stores(parent=parent):
            try:
                delete_op = client.delete_data_store(name=existing_ds.name)
                delete_op.result()
                break
            except google.api_core.exceptions.GoogleAPICallError:
                continue

        operation = client.create_data_store(
            parent=parent,
            data_store=data_store,
            data_store_id=data_store_id,
        )
        response = operation.result()
        print(f"Created data store: {response.name}")
    except google.api_core.exceptions.AlreadyExists:
        delete_op = client.delete_data_store(
            name=f"{parent}/dataStores/{data_store_id}"
        )
        delete_op.result()
        operation = client.create_data_store(
            parent=parent,
            data_store=data_store,
            data_store_id=data_store_id,
        )
        response = operation.result()
        print(f"Created data store: {response.name}")
# [END discoveryengine_v1alpha_datastoreservice_datastore_create]
