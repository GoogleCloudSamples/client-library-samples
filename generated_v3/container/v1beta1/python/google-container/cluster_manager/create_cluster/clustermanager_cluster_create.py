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

# [START container_v1beta1_clustermanager_cluster_create]
import google.api_core.exceptions
from google.cloud import container_v1beta1

client = container_v1beta1.ClusterManagerClient()


def create_cluster(project_id: str, location_id: str, cluster_id: str) -> None:
    """Create a cluster using the ClusterManagerClient.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone for the cluster (for example, 'us-central1' or 'us-central1-a').
        cluster_id: The unique identifier of the cluster to create. Must start with a letter, end with a letter or digit, and contain only lowercase letters, digits, and hyphens (up to 40 characters).
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    cluster = container_v1beta1.Cluster(
        name=cluster_id,
        initial_node_count=1,
    )

    request = container_v1beta1.CreateClusterRequest(
        parent=parent,
        cluster=cluster,
    )

    try:
        operation = client.create_cluster(request=request)
        print(f"Cluster creation initiated: {operation.name}")
        print(f"Operation status: {operation.status}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create cluster: {error}")
# [END container_v1beta1_clustermanager_cluster_create]
