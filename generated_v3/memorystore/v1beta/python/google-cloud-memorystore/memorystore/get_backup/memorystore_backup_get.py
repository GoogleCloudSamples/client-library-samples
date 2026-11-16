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

# [START memorystore_v1beta_memorystore_backup_get]
import google.api_core.exceptions
from google.cloud import memorystore_v1beta

client = memorystore_v1beta.MemorystoreClient()


def get_backup(
    project_id: str,
    location_id: str,
    backup_collection_id: str,
    backup_id: str,
) -> None:
    """Use the get_backup method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        backup_collection_id: ID of the BackupCollection (for example, 'example-backupcollection-id')
        backup_id: ID of the Backup (for example, 'example-backup-id')
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"backupCollections/{backup_collection_id}/backups/{backup_id}"
    )

    request = memorystore_v1beta.GetBackupRequest(
        name=name,
    )

    try:
        response = client.get_backup(request=request)
        print(f"Retrieved backup: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error retrieving backup: {error}")
# [END memorystore_v1beta_memorystore_backup_get]
