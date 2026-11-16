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

# [START memorystore_v1_memorystore_backupcollections_list]
import google.api_core.exceptions
from google.cloud import memorystore_v1

client = memorystore_v1.MemorystoreClient()


def list_backup_collections(project_id: str, location_id: str) -> None:
    """Lists Memorystore backup collections in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1') or '-'
          to query all locations.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = memorystore_v1.ListBackupCollectionsRequest(
        parent=parent,
    )

    try:
        response = client.list_backup_collections(request=request)
        for backup_collection in response:
            print(f"Backup collection name: {backup_collection.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list backup collections: {error.message}")
# [END memorystore_v1_memorystore_backupcollections_list]
