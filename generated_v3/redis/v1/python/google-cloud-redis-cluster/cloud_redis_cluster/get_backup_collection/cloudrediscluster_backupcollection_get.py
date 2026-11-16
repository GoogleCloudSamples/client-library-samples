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

# [START redis_v1_cloudrediscluster_backupcollection_get]
import google.api_core.exceptions
from google.cloud import redis_cluster_v1


def get_backup_collection(
    project_id: str, location_id: str, backup_collection_id: str
) -> None:
    """Retrieves information about a specific Redis cluster backup collection.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the backup collection is
          located (for example, 'us-central1').
        backup_collection_id: The server-generated ID of the backup collection
          (for example, 'example-backup-collection').
    """
    client = redis_cluster_v1.CloudRedisClusterClient()

    name = f"projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}"

    request = redis_cluster_v1.GetBackupCollectionRequest(name=name)

    try:
        response = client.get_backup_collection(request=request)
        print(f"Retrieved backup collection: {response.name}")
        print(f"Associated cluster: {response.cluster}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve backup collection: {e}")
# [END redis_v1_cloudrediscluster_backupcollection_get]
