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

# [START metastore_v1_dataprocmetastore_backup_get]
import google.api_core.exceptions
from google.cloud import metastore_v1

client = metastore_v1.DataprocMetastoreClient()


def get_backup(
    location_id: str, service_id: str, backup_id: str, project_id: str
) -> None:
    """Retrieves details of a specific Dataproc Metastore backup.

    Args:
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        service_id: ID of the Service (for example, 'example-service-id').
        backup_id: ID of the Backup (for example, 'example-backup-id').
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/services/{service_id}/backups/{backup_id}"

    request = metastore_v1.GetBackupRequest(name=name)

    try:
        response = client.get_backup(request=request)
        print(f"Backup resource name: {response.name}")
        print(f"Backup state: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve backup: {e}")
# [END metastore_v1_dataprocmetastore_backup_get]
