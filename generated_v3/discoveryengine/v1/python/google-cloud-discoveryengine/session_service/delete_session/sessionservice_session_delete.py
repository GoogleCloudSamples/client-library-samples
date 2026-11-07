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

# [START discoveryengine_v1_sessionservice_session_delete]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1


def delete_session(
    project_id: str,
    location_id: str,
    collection_id: str,
    data_store_id: str,
    session_id: str,
) -> None:
    """Deletes a session from a Discovery Engine data store.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
        collection_id: ID of the collection (for example, 'default_collection').
        data_store_id: ID of the data store (for example, 'example-datastore-id').
        session_id: ID of the session (for example, 'example-session-id').
    """
    client = discoveryengine_v1.SessionServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/collections/{collection_id}/dataStores/{data_store_id}"
        f"/sessions/{session_id}"
    )

    request = discoveryengine_v1.DeleteSessionRequest(
        name=name,
    )

    try:
        client.delete_session(request=request)
        print(f"Deleted session: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Session not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e.message}")
# [END discoveryengine_v1_sessionservice_session_delete]
