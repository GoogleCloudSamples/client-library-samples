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

# [START container_v1beta1_clustermanager_fetch_cluster_upgrade_info]
import google.api_core.exceptions
from google.cloud import container_v1beta1

client = container_v1beta1.ClusterManagerClient()


def fetch_cluster_upgrade_info(
    project_id: str, location_id: str, cluster_id: str
) -> None:
    """Fetches cluster upgrade information.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or zone where the cluster resides (for example, 'us-central1' or 'us-central1-a').
        cluster_id: The caller-chosen identifier of the cluster (for example, 'example-cluster-id').
    """
    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"

    request = container_v1beta1.FetchClusterUpgradeInfoRequest(
        name=name,
    )

    try:
        response = client.fetch_cluster_upgrade_info(request=request)
        print(f"Retrieved upgrade info: {response}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to fetch cluster upgrade info: {e}")
# [END container_v1beta1_clustermanager_fetch_cluster_upgrade_info]
