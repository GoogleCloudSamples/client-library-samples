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

# [START redis_v1_cloudrediscluster_backupcollections_list]
import google.api_core.exceptions
from google.cloud import redis_cluster_v1


def list_backup_collections(project_id: str, location_id: str) -> None:
    """Lists Redis Cluster backup collections in a Google Cloud location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    client = redis_cluster_v1.CloudRedisClusterClient()
    parent = f"projects/{project_id}/locations/{location_id}"
    request = redis_cluster_v1.ListBackupCollectionsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_backup_collections(request=request)
        for backup_collection in page_result:
            print(f"Backup collection: {backup_collection.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END redis_v1_cloudrediscluster_backupcollections_list]
