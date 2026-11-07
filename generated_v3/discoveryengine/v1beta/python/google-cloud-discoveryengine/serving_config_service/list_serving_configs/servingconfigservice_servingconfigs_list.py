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

# [START discoveryengine_v1beta_servingconfigservice_servingconfigs_list]
import google.api_core.client_options
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta


def list_serving_configs(
    project_id: str, location_id: str, data_store_id: str
) -> None:
    """Lists serving configurations for a DataStore.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the data store is located (for example, 'global').
        data_store_id: The unique identifier of the DataStore.
    """
    client_options = (
        google.api_core.client_options.ClientOptions(
            api_endpoint=f"{location_id}-discoveryengine.googleapis.com"
        )
        if location_id != "global"
        else None
    )
    client = discoveryengine_v1beta.ServingConfigServiceClient(
        client_options=client_options
    )

    parent = f"projects/{project_id}/locations/{location_id}/dataStores/{data_store_id}"

    request = discoveryengine_v1beta.ListServingConfigsRequest(
        parent=parent,
    )

    try:
        response = client.list_serving_configs(request=request)
        count = 0
        for serving_config in response:
            print(f"Serving config name: {serving_config.name}")
            print(f"Display name: {serving_config.display_name}")
            count += 1
        if count == 0:
            print(f"No serving configurations found for: {parent}")
        print(f"Total serving configurations: {count}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END discoveryengine_v1beta_servingconfigservice_servingconfigs_list]
