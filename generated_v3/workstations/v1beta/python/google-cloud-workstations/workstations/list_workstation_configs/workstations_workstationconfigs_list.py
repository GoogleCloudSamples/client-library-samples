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

# [START workstations_v1beta_workstations_workstationconfigs_list]
import google.api_core.exceptions
from google.cloud import workstations_v1beta

client = workstations_v1beta.WorkstationsClient()


def list_workstation_configs(
    project_id: str, location_id: str, workstation_cluster_id: str
) -> None:
    """List workstation configurations in a workstation cluster.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the workstation cluster resides.
        workstation_cluster_id: The ID of the parent workstation cluster.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"workstationClusters/{workstation_cluster_id}"
    )

    try:
        response = client.list_workstation_configs(parent=parent)
        for config in response:
            print(f"Workstation config: {config.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing workstation configs: {error}")
# [END workstations_v1beta_workstations_workstationconfigs_list]
