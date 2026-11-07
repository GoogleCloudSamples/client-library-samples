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

# [START memorystore_v1_memorystore_backupcollection_get]
import google.api_core.exceptions
from google.cloud import memorystore_v1

client = memorystore_v1.MemorystoreClient()


def get_backup_collection(
    project_id: str, location_id: str, backup_collection_id: str
) -> None:
    """Retrieves details of a specific Memorystore backup collection.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the backup collection resides (for example, 'us-central1').
        backup_collection_id: The server-generated ID of the backup collection (for example, 'backup-collection-1').
    """
    name = f"projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}"

    try:
        response = client.get_backup_collection(name=name)
        print(f"Retrieved backup collection: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve backup collection: {error}")
# [END memorystore_v1_memorystore_backupcollection_get]
