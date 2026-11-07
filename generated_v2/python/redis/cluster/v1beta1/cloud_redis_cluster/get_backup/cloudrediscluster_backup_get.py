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

# [START redis_v1beta1_cloudrediscluster_backup_get]
from google.api_core import exceptions
from google.cloud import redis_cluster_v1


def get_backup(
    project_id: str,
    location_id: str,
    backup_collection_id: str,
    backup_id: str,
) -> None:
    """Gets details of a specific backup in a backup collection.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        backup_collection_id: The server-generated ID of the backup collection
          (for example, 'example-backup-collection-id'), typically obtained from
          the cluster's backup_collection field or by listing backup
          collections.
        backup_id: The identifier of the backup (for example,
          '20240515123000_1234'), either caller-specified during backup
          creation or server-generated.
    """
    client = redis_cluster_v1.CloudRedisClusterClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"backupCollections/{backup_collection_id}/backups/{backup_id}"
    )

    request = redis_cluster_v1.GetBackupRequest(name=name)

    try:
        response = client.get_backup(request=request)
        print(f"Backup retrieved successfully: {response.name}")
        print(f"Backup state: {response.state}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END redis_v1beta1_cloudrediscluster_backup_get]
