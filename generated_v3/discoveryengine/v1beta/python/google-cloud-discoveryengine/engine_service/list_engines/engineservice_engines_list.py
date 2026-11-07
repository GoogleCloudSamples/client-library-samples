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

# [START discoveryengine_v1beta_engineservice_engines_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.EngineServiceClient()


def list_engines(project_id: str, location_id: str, collection_id: str) -> None:
    """Lists engines associated with a specific collection.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
        collection_id: ID of the Collection (for example, 'default_collection').
    """
    parent = f"projects/{project_id}/locations/{location_id}/collections/{collection_id}"

    request = discoveryengine_v1beta.ListEnginesRequest(parent=parent)

    try:
        page_result = client.list_engines(request=request)
        for engine in page_result:
            print(f"Engine Name: {engine.name}")
            print(f"Display Name: {engine.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Listing engines failed: {error}")


# [END discoveryengine_v1beta_engineservice_engines_list]
