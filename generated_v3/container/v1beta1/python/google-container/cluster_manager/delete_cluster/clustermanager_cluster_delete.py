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

# [START container_v1beta1_clustermanager_cluster_delete]
import google.api_core.exceptions
from google.cloud import container_v1beta1

client = container_v1beta1.ClusterManagerClient()


def delete_cluster(project_id: str, location_id: str, cluster_id: str) -> None:
    """Use the delete_cluster method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone where the cluster resides.
        cluster_id: The identifier of the cluster to delete. This is caller-specified when creating the cluster.
    """
    cluster_name = (
        f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"
    )
    request = container_v1beta1.DeleteClusterRequest(name=cluster_name)

    try:
        operation = client.delete_cluster(request=request)
        print(f"Deletion initiated for cluster: {cluster_name}")
        print(f"Operation name: {operation.name}")
    except google.api_core.exceptions.NotFound:
        print(f"Cluster not found: {cluster_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete cluster: {error}")
# [END container_v1beta1_clustermanager_cluster_delete]
