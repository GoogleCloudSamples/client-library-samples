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

# [START container_v1_clustermanager_set_network_policy]
import google.api_core.exceptions
from google.cloud import container_v1

client = container_v1.ClusterManagerClient()


def set_network_policy(project_id: str, location_id: str, cluster_id: str) -> None:
    """Use the set_network_policy method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone for the cluster.
        cluster_id: The name of the GKE cluster.
    """
    network_policy = container_v1.NetworkPolicy(
        enabled=True,
        provider=container_v1.NetworkPolicy.Provider.CALICO,
    )
    cluster_name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"
    request = container_v1.SetNetworkPolicyRequest(
        name=cluster_name,
        network_policy=network_policy,
    )

    try:
        operation = client.set_network_policy(request=request)
        print(f"Network policy configuration initiated. Operation: {operation.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to set network policy: {error}")
# [END container_v1_clustermanager_set_network_policy]
