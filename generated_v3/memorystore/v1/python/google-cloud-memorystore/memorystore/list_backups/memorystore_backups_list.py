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

# [START memorystore_v1_memorystore_backups_list]
import google.api_core.exceptions
from google.cloud import memorystore_v1

client = memorystore_v1.MemorystoreClient()


def list_backups(project_id: str, location_id: str, backup_collection_id: str) -> None:
    """List backups for a given backup collection in Memorystore.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        backup_collection_id: ID of the BackupCollection (for example, 'example-backupcollection-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}"

    request = memorystore_v1.ListBackupsRequest(
        parent=parent,
    )

    try:
        response = client.list_backups(request=request)
        for backup in response:
            print(f"Backup name: {backup.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list backups: {error}")
# [END memorystore_v1_memorystore_backups_list]
