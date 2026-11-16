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

# [START redis_cluster_v1_cloudrediscluster_clusters_list]
import google.api_core.exceptions
from google.cloud import redis_cluster_v1


def list_clusters(project_id: str, location_id: str) -> None:
    """Lists Redis clusters in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = redis_cluster_v1.CloudRedisClusterClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = redis_cluster_v1.ListClustersRequest(parent=parent)
        page_result = client.list_clusters(request=request)

        cluster_count = 0
        for cluster in page_result:
            cluster_count += 1
            print(f"Cluster name: {cluster.name}")
            print(f"Cluster state: {cluster.state}")

        if cluster_count == 0:
            print(f"No clusters found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing clusters: {error}")
# [END redis_cluster_v1_cloudrediscluster_clusters_list]
