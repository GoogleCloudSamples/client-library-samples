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

# [START workstations_v1_workstations_workstationcluster_update]
import google.api_core.exceptions
from google.cloud import workstations_v1
from google.protobuf import field_mask_pb2

client = workstations_v1.WorkstationsClient()


def update_workstation_cluster(
    project_id: str, location_id: str, workstation_cluster_id: str
) -> None:
    """Updates a workstation cluster.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the workstation cluster.
        workstation_cluster_id: The ID of the workstation cluster to update.
    """
    cluster_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"workstationClusters/{workstation_cluster_id}"
    )
    workstation_cluster = workstations_v1.WorkstationCluster(
        name=cluster_name,
        display_name="Updated Cluster Display Name",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        operation = client.update_workstation_cluster(
            workstation_cluster=workstation_cluster,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated workstation cluster: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update workstation cluster: {e}")
# [END workstations_v1_workstations_workstationcluster_update]
