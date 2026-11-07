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

# [START workstations_v1beta_workstations_workstationconfig_update]
import google.api_core.exceptions
from google.cloud import workstations_v1beta
from google.protobuf import field_mask_pb2

client = workstations_v1beta.WorkstationsClient()


def update_workstation_config(
    project_id: str,
    location_id: str,
    workstation_cluster_id: str,
    workstation_config_id: str,
) -> None:
    """Updates the display name of a workstation configuration.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the workstation cluster resides.
        workstation_cluster_id: The identifier of the parent workstation cluster.
        workstation_config_id: The identifier of the workstation configuration to update.
    """
    config_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"workstationClusters/{workstation_cluster_id}/"
        f"workstationConfigs/{workstation_config_id}"
    )
    workstation_config = workstations_v1beta.WorkstationConfig(
        name=config_name,
        display_name="Updated Workstation Configuration",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        operation = client.update_workstation_config(
            workstation_config=workstation_config,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated workstation configuration: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update workstation configuration: {error}")
# [END workstations_v1beta_workstations_workstationconfig_update]
