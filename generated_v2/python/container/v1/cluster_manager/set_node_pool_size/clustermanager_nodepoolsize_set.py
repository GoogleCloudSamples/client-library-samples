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

# [START container_v1_clustermanager_set_node_pool_size]
import google.api_core.exceptions
from google.cloud import container_v1


def set_node_pool_size(
    project_id: str, location_id: str, cluster_id: str, node_pool_id: str
) -> None:
    """Resizes a node pool in a Google Kubernetes Engine cluster.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone of the GKE cluster.
        cluster_id: The identifier of the GKE cluster.
        node_pool_id: The identifier of the node pool to resize.
    """
    client = container_v1.ClusterManagerClient()

    # Set node count to 1 to stay within regional CPU quota limits during testing
    node_count = 1
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"clusters/{cluster_id}/nodePools/{node_pool_id}"
    )

    request = container_v1.SetNodePoolSizeRequest(
        name=name,
        node_count=node_count,
    )

    try:
        response = client.set_node_pool_size(request=request)
        print(f"Operation started: {response.name}")
        print(f"Status: {response.status}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to resize node pool: {e}")
# [END container_v1_clustermanager_set_node_pool_size]
