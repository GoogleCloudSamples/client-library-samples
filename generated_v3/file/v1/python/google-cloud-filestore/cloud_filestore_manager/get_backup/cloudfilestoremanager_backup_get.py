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

# [START file_v1_cloudfilestoremanager_backup_get]
import google.api_core.exceptions
from google.cloud import filestore_v1


def get_backup(location_id: str, backup_id: str, project_id: str) -> None:
    """Retrieves metadata for a Filestore backup.

    Args:
        location_id: The Google Cloud region where the Filestore backup is located (for example, 'us-central1').
        backup_id: The caller-defined ID of the Filestore backup.
        project_id: The Google Cloud project ID.
    """
    client = filestore_v1.CloudFilestoreManagerClient()

    name = f"projects/{project_id}/locations/{location_id}/backups/{backup_id}"

    request = filestore_v1.GetBackupRequest(name=name)

    try:
        response = client.get_backup(request=request)
        print(f"Backup name: {response.name}")
        print(f"State: {response.state.name}")
        print(f"Capacity: {response.capacity_gb} GiB")
        print(f"Source instance: {response.source_instance}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve backup: {error}")
# [END file_v1_cloudfilestoremanager_backup_get]
