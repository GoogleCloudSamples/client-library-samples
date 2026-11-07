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

# [START enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_publickg_search]
import google.api_core.exceptions
from google.cloud import enterpriseknowledgegraph_v1

client = enterpriseknowledgegraph_v1.EnterpriseKnowledgeGraphServiceClient()


def search_public_kg(project_id: str, location_id: str) -> None:
    """Search public Knowledge Graph entities.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
    """
    query = "Google"
    parent = f"projects/{project_id}/locations/{location_id}"

    request = enterpriseknowledgegraph_v1.SearchPublicKgRequest(
        parent=parent,
        query=query,
    )

    try:
        response = client.search_public_kg(request=request)
        print(f"Search results: {response.item_list_element}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_publickg_search]
