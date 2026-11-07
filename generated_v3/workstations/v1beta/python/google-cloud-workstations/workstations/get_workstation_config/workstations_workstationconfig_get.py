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

# [START workstations_v1beta_workstations_workstationconfig_get]
import google.api_core.exceptions
from google.cloud import workstations_v1beta

client = workstations_v1beta.WorkstationsClient()


def get_workstation_config(
    project_id: str,
    location_id: str,
    workstation_cluster_id: str,
    workstation_config_id: str,
) -> None:
    """Retrieve details for a workstation configuration.

    Args:
        project_id: The Google Cloud project ID containing the workstation
          cluster and configuration.
        location_id: The Google Cloud region where the workstation cluster is
          located (for example, 'us-central1').
        workstation_cluster_id: The identifier of the workstation cluster.
        workstation_config_id: The identifier of the workstation configuration.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/workstationClusters/{workstation_cluster_id}"
        f"/workstationConfigs/{workstation_config_id}"
    )

    request = workstations_v1beta.GetWorkstationConfigRequest(
        name=name,
    )

    try:
        response = client.get_workstation_config(request=request)
        print(f"Workstation configuration retrieved: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve workstation configuration: {error}")
# [END workstations_v1beta_workstations_workstationconfig_get]
