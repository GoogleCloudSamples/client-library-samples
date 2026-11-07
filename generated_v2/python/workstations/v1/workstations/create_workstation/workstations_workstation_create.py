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

# [START workstations_v1_workstations_workstation_create]
import google.api_core.exceptions
from google.cloud import workstations_v1

client = workstations_v1.WorkstationsClient()


def create_workstation(
    workstation_id: str,
    project_id: str,
    location_id: str,
    workstation_cluster_id: str,
    workstation_config_id: str,
) -> None:
    """Creates a workstation in a workstation configuration.

    Args:
        workstation_id: Identifier to assign to the new workstation (for example, 'example-workstation').
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud region where the workstation cluster resides (for example, 'us-central1').
        workstation_cluster_id: Identifier of the workstation cluster (for example, 'example-cluster').
        workstation_config_id: Identifier of the workstation configuration (for example, 'example-config').
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"workstationClusters/{workstation_cluster_id}/"
        f"workstationConfigs/{workstation_config_id}"
    )
    workstation = workstations_v1.Workstation(
        display_name="Example Workstation"
    )

    try:
        operation = client.create_workstation(
            parent=parent,
            workstation=workstation,
            workstation_id=workstation_id,
        )
        response = operation.result()
        print(f"Created workstation: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create workstation: {e}")
# [END workstations_v1_workstations_workstation_create]
