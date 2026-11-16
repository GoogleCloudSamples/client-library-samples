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

# [START redis_cluster_v1_get_cluster]
import google.api_core.exceptions
from google.cloud import redis_cluster_v1


def get_cluster(project_id: str, location_id: str, cluster_id: str) -> None:
    """Retrieve details of a specified Redis cluster.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        cluster_id: The cluster identifier (for example, 'example-cluster-id').
    """
    client = redis_cluster_v1.CloudRedisClusterClient()

    name = client.cluster_path(project_id, location_id, cluster_id)

    request = redis_cluster_v1.GetClusterRequest(
        name=name,
    )

    try:
        response = client.get_cluster(request=request)
        print(f"Cluster retrieved: {response.name}")
        print(f"State: {response.state}")
        print(f"Node type: {response.node_type}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve cluster: {e}")


# [END redis_cluster_v1_get_cluster]
