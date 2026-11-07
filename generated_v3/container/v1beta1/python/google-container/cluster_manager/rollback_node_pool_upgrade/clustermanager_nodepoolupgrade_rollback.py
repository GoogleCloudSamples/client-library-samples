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

# [START container_v1beta1_clustermanager_rollback_node_pool_upgrade]
import google.api_core.exceptions
from google.cloud import container_v1beta1

client = container_v1beta1.ClusterManagerClient()


def rollback_node_pool_upgrade(
    project_id: str, location_id: str, cluster_id: str, node_pool_id: str
) -> None:
    """Rolls back an in-progress or failed node pool upgrade.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud zone or region for the cluster.
        cluster_id: The caller-chosen name of the cluster.
        node_pool_id: The caller-chosen name of the node pool to roll back.
    """
    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}/nodePools/{node_pool_id}"

    request = container_v1beta1.RollbackNodePoolUpgradeRequest(name=name)

    try:
        response = client.rollback_node_pool_upgrade(request=request)
        print(f"Node pool rollback initiated. Operation: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END container_v1beta1_clustermanager_rollback_node_pool_upgrade]
