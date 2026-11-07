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

# [START redis_v1_cloudrediscluster_backup_delete]
import google.api_core.exceptions
from google.cloud import redis_cluster_v1


def delete_backup(
    project_id: str,
    location_id: str,
    backup_collection_id: str,
    backup_id: str,
) -> None:
    """Delete a backup in a Cloud Redis cluster.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        backup_collection_id: The ID of the backup collection containing the backup. Read this identifier from the cluster's backup_collection attribute or by listing backup collections.
        backup_id: The ID of the backup to delete. Read this identifier from an existing backup (for example, via ListBackups). Do not use aliases.
    """
    client = redis_cluster_v1.CloudRedisClusterClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"backupCollections/{backup_collection_id}/backups/{backup_id}"
    )

    request = redis_cluster_v1.DeleteBackupRequest(name=name)

    try:
        operation = client.delete_backup(request=request)
        print(f"Waiting for operation to complete: {operation.operation.name}")
        operation.result()
        print(f"Deleted backup: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete backup: {error}")
# [END redis_v1_cloudrediscluster_backup_delete]
