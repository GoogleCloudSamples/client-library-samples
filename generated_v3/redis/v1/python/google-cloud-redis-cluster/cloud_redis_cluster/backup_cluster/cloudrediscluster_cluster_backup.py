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

# [START redis_v1_cloudrediscluster_backup_cluster]
from google.api_core import exceptions
from google.cloud import redis_cluster_v1


def backup_cluster(project_id: str, location_id: str, cluster_id: str) -> None:
    """Backs up a Redis cluster.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        cluster_id: The identifier of the Redis cluster to back up.
    """
    client = redis_cluster_v1.CloudRedisClusterClient()

    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"

    request = redis_cluster_v1.BackupClusterRequest(name=name)

    try:
        operation = client.backup_cluster(request=request)
        print(f"Waiting for operation {operation.operation.name} to complete...")
        response = operation.result()
        print(f"Cluster backup completed successfully: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Backup operation failed: {e}")
# [END redis_v1_cloudrediscluster_backup_cluster]
