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

# [START container_v1_clustermanager_cluster_get]
import google.api_core.exceptions
from google.cloud import container_v1

client = container_v1.ClusterManagerClient()


def get_cluster(project_id: str, location_id: str, cluster_id: str) -> None:
    """Retrieves the details of an existing Google Kubernetes Engine cluster.

    Args:
        project_id: The Google Cloud project ID hosting the cluster.
        location_id: The Google Cloud region or zone where the cluster is located (for example, 'us-central1' or 'us-central1-a').
        cluster_id: The identifier of the cluster to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"

    try:
        response = client.get_cluster(name=name)
        print(f"Cluster name: {response.name}")
        print(f"Cluster endpoint: {response.endpoint}")
        print(f"Cluster status: {response.status.name}")
    except google.api_core.exceptions.NotFound:
        print(f"Cluster not found at {name}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error.message}")
# [END container_v1_clustermanager_cluster_get]
