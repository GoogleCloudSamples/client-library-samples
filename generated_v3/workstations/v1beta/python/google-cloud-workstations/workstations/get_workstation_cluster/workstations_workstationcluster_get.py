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

# [START workstations_v1beta_workstations_workstationcluster_get]
import google.api_core.exceptions
from google.cloud import workstations_v1beta

client = workstations_v1beta.WorkstationsClient()


def get_workstation_cluster(
    project_id: str, location_id: str, workstation_cluster_id: str
) -> None:
    """Retrieves details of an existing workstation cluster.

    Args:
        project_id: The Google Cloud project ID containing the workstation cluster.
        location_id: The Google Cloud region where the workstation cluster is located.
        workstation_cluster_id: The identifier of the workstation cluster to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/workstationClusters/{workstation_cluster_id}"

    request = workstations_v1beta.GetWorkstationClusterRequest(
        name=name,
    )

    try:
        response = client.get_workstation_cluster(request=request)
        print(f"Cluster retrieved: {response.name}")
        print(f"Cluster state: {response.network}")
    except google.api_core.exceptions.NotFound:
        print(f"Workstation cluster not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e.message}")
# [END workstations_v1beta_workstations_workstationcluster_get]
