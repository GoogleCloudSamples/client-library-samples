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

# [START workstations_v1_workstations_usableworkstations_list]
import google.api_core.exceptions
from google.cloud import workstations_v1

client = workstations_v1.WorkstationsClient()


def list_usable_workstations(
    project_id: str,
    location_id: str,
    workstation_cluster_id: str,
    workstation_config_id: str,
) -> None:
    """Lists workstations that the caller has permission to use.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the workstation cluster is located.
        workstation_cluster_id: The ID of the workstation cluster.
        workstation_config_id: The ID of the workstation configuration.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"workstationClusters/{workstation_cluster_id}/"
        f"workstationConfigs/{workstation_config_id}"
    )

    request = workstations_v1.ListUsableWorkstationsRequest(
        parent=parent,
    )

    try:
        response = client.list_usable_workstations(request=request)
        for workstation in response:
            print(f"Workstation: {workstation.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list usable workstations: {e}")
# [END workstations_v1_workstations_usableworkstations_list]
