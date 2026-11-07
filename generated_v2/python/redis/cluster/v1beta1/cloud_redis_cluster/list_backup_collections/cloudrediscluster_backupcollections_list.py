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

# [START redis_v1beta1_cloudrediscluster_backupcollections_list]
import google.api_core.exceptions
from google.cloud import redis_cluster_v1


def list_backup_collections(project_id: str, location_id: str) -> None:
    """Lists backup collections in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID hosting the Redis clusters and
          backup collections.
        location_id: The Google Cloud region where the Redis cluster backup
          collections are located (for example, 'us-central1'), or '-' for all
          locations.
    """
    client = redis_cluster_v1.CloudRedisClusterClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = redis_cluster_v1.ListBackupCollectionsRequest(
        parent=parent,
    )

    try:
        response = client.list_backup_collections(request=request)
        for backup_collection in response:
            print(f"Backup collection: {backup_collection.name}")
            print(f"Associated cluster: {backup_collection.cluster}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list backup collections: {error}")
# [END redis_v1beta1_cloudrediscluster_backupcollections_list]
