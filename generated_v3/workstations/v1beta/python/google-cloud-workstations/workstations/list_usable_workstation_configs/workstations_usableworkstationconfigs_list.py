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

# [START workstations_v1beta_workstations_usableworkstationconfigs_list]
import google.api_core.exceptions
from google.cloud import workstations_v1beta

client = workstations_v1beta.WorkstationsClient()


def list_usable_workstation_configs(
    project_id: str, location_id: str, workstation_cluster_id: str
) -> None:
    """Lists workstation configurations that the caller has permission to use.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID (for example, "us-central1").
        workstation_cluster_id: The ID of the workstation cluster.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/workstationClusters/"
        f"{workstation_cluster_id}"
    )
    request = workstations_v1beta.ListUsableWorkstationConfigsRequest(
        parent=parent,
    )

    try:
        response = client.list_usable_workstation_configs(request=request)
        for config in response:
            print(f"Workstation config: {config.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list usable workstation configs: {e}")
# [END workstations_v1beta_workstations_usableworkstationconfigs_list]
