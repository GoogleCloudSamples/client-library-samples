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

# [START container_v1_clustermanager_set_labels]
import google.api_core.exceptions
from google.cloud import container_v1

client = container_v1.ClusterManagerClient()


def set_labels(project_id: str, location_id: str, cluster_id: str) -> None:
    """Sets labels on an existing Google Kubernetes Engine cluster.

    Args:
        project_id: The Google Cloud project ID hosting the cluster.
        location_id: The Google Cloud region or zone where the cluster is located.
        cluster_id: The identifier of the existing GKE cluster.
    """
    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"

    try:
        # Retrieve the current cluster state to obtain the label fingerprint for safe updates.
        cluster = client.get_cluster(name=name)
        label_fingerprint = cluster.label_fingerprint

        # Merge existing cluster labels with the updated labels.
        resource_labels = dict(cluster.resource_labels)
        resource_labels["environment"] = "staging"
        resource_labels["managed-by"] = "cluster-manager"

        request = container_v1.SetLabelsRequest(
            name=name,
            resource_labels=resource_labels,
            label_fingerprint=label_fingerprint,
        )

        operation = client.set_labels(request=request)
        print(f"Label update initiated: {operation.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to set labels on cluster '{cluster_id}': {error}")
# [END container_v1_clustermanager_set_labels]
