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

# [START container_v1_clustermanager_start_ip_rotation]
import google.api_core.exceptions
from google.cloud import container_v1

client = container_v1.ClusterManagerClient()


def start_ip_rotation(project_id: str, location_id: str, cluster_id: str, rotate_credentials: str) -> None:
    """Initiates an IP rotation for a Google Kubernetes Engine cluster.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone of the cluster (for example, 'us-central1' or 'us-central1-a').
        cluster_id: The name of the GKE cluster.
        rotate_credentials: Whether to rotate credentials during IP rotation.
    """
    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"

    # Normalize rotate_credentials to a boolean value
    rotate_creds_bool = (
        rotate_credentials.lower() == "true"
        if isinstance(rotate_credentials, str)
        else bool(rotate_credentials)
    )

    request = container_v1.StartIPRotationRequest(
        name=name,
        rotate_credentials=rotate_creds_bool,
    )

    try:
        response = client.start_ip_rotation(request=request)
        print(f"Started IP rotation for cluster: {cluster_id}")
        print(f"Operation name: {response.name}")
        print(f"Operation status: {response.status.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to start IP rotation: {e}")
    except google.api_core.exceptions.RetryError as e:
        print(f"Retry error encountered while starting IP rotation: {e}")
# [END container_v1_clustermanager_start_ip_rotation]
