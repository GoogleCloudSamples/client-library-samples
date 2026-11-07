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

# [START discoveryengine_v1_searchtuningservice_custommodels_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1


def list_custom_models(
    project_id: str,
    location_id: str,
    collection_id: str,
    data_store_id: str,
) -> None:
    """Lists custom models for a Discovery Engine data store.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (for example, 'global' or 'us').
        collection_id: The Discovery Engine collection ID (for example, 'default_collection').
        data_store_id: The Discovery Engine data store ID (for example, 'default_data_store').
    """
    client = discoveryengine_v1.SearchTuningServiceClient()

    data_store = (
        f"projects/{project_id}/locations/{location_id}/collections/"
        f"{collection_id}/dataStores/{data_store_id}"
    )

    request = discoveryengine_v1.ListCustomModelsRequest(
        data_store=data_store,
    )

    try:
        response = client.list_custom_models(request=request)
        print(f"Custom models found: {len(response.models)}")
        for custom_model in response.models:
            print(f"Model ID: {custom_model.model_id}")
            print(f"Model version: {custom_model.model_version}")
            print(f"Model state: {custom_model.model_state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END discoveryengine_v1_searchtuningservice_custommodels_list]
