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

# [START memorystore_v1beta_memorystore_backups_list]
import google.api_core.exceptions
from google.cloud import memorystore_v1beta

client = memorystore_v1beta.MemorystoreClient()


def list_backups(project_id: str, location_id: str, backup_collection_id: str) -> None:
    """Lists backups in a Memorystore backup collection.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        backup_collection_id: Server-generated identifier of the backup collection
            (for example, obtained from an existing instance's backup_collection attribute or via ListBackupCollections).
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"backupCollections/{backup_collection_id}"
    )

    request = memorystore_v1beta.ListBackupsRequest(parent=parent)

    try:
        response = client.list_backups(request=request)
        for backup in response:
            print(f"Backup: {backup.name}")
        print("Backups listed successfully.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END memorystore_v1beta_memorystore_backups_list]
