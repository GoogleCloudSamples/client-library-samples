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

# [START datastore_v1_datastoreadmin_indexes_list]
import google.api_core.exceptions
from google.cloud import datastore_admin_v1


def list_indexes(project_id: str) -> None:
    """Lists composite indexes in Google Cloud Datastore.

    Args:
        project_id: The ID of the Google Cloud project to list composite indexes for.
    """
    client = datastore_admin_v1.DatastoreAdminClient()

    request = datastore_admin_v1.ListIndexesRequest(
        project_id=project_id,
    )

    try:
        indexes = client.list_indexes(request=request)
        for index in indexes:
            print(f"Index ID: {index.index_id}")
            print(f"Kind: {index.kind}")
            print(f"State: {index.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error.message}")
# [END datastore_v1_datastoreadmin_indexes_list]
