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

# [START discoveryengine_v1beta_sessionservice_session_create]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.SessionServiceClient()


def create_session(
    project_id: str, location_id: str, collection_id: str, data_store_id: str
) -> None:
    """Use the create_session method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        collection_id: ID of the Collection (for example, 'example-collection-id')
        data_store_id: ID of the DataStore (for example, 'example-datastore-id')
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/collections/{collection_id}"
        f"/dataStores/{data_store_id}"
    )
    session = discoveryengine_v1beta.Session(
        user_pseudo_id="example-user-pseudo-id"
    )

    try:
        response = client.create_session(parent=parent, session=session)
        print(f"Created session: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END discoveryengine_v1beta_sessionservice_session_create]
