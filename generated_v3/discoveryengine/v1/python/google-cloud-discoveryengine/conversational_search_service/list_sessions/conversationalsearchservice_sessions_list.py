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

# [START discoveryengine_v1_conversationalsearchservice_sessions_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1

client = discoveryengine_v1.ConversationalSearchServiceClient()


def list_sessions(
    project_id: str, location_id: str, collection_id: str, data_store_id: str
) -> None:
    """Use the list_sessions method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        collection_id: ID of the Collection (for example, 'example-collection-id')
        data_store_id: ID of the DataStore (for example, 'example-datastore-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}/collections/{collection_id}/dataStores/{data_store_id}"

    request = discoveryengine_v1.ListSessionsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_sessions(request=request)
        for session in page_result:
            print(f"Session name: {session.name}")
            print(f"Session state: {session.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list sessions: {e}")
# [END discoveryengine_v1_conversationalsearchservice_sessions_list]
