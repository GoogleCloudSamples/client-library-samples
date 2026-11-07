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

# [START datastore_v1_datastoreadmin_index_get]
from google.api_core import exceptions
from google.cloud import datastore_admin_v1


def get_index(project_id: str, index_id: str) -> None:
    """Retrieves information about a Cloud Datastore composite index.

    Args:
        project_id: The ID of the Google Cloud project containing the composite index.
        index_id: The server-generated resource ID of the Datastore composite index to retrieve.
    """
    client = datastore_admin_v1.DatastoreAdminClient()

    request = datastore_admin_v1.GetIndexRequest(
        project_id=project_id,
        index_id=index_id,
    )

    try:
        response = client.get_index(request=request)
        print(f"Index ID: {response.index_id}")
        print(f"Kind: {response.kind}")
        print(f"State: {response.state.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve index: {e.message}")
# [END datastore_v1_datastoreadmin_index_get]
