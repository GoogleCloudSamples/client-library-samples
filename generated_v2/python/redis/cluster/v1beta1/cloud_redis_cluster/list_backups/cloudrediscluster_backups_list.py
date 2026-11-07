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

# [START redis_v1beta1_cloudrediscluster_backups_list]
import google.api_core.exceptions
from google.cloud import redis_cluster_v1


def list_backups(
    project_id: str, location_id: str, backup_collection_id: str
) -> None:
    """Lists backups in a Google Cloud Redis cluster backup collection.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the backup collection is located (for example, 'us-central1').
        backup_collection_id: The server-generated backup collection ID from an existing backup collection.
    """
    client = redis_cluster_v1.CloudRedisClusterClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}"
    )

    request = redis_cluster_v1.ListBackupsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_backups(request=request)
        for backup in page_result:
            print(f"Backup name: {backup.name}")
            print(f"Backup state: {backup.state.name}")
            print(f"Cluster UID: {backup.cluster_uid}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed with error: {e}")
# [END redis_v1beta1_cloudrediscluster_backups_list]
