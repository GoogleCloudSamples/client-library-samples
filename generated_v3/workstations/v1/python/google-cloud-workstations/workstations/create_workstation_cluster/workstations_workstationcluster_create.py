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

# [START workstations_create_workstation_cluster]
import google.api_core.exceptions
from google.cloud import workstations_v1


def create_workstation_cluster(
    workstation_cluster_id: str, project_id: str, location_id: str
) -> None:
    """Creates a workstation cluster in the specified project and location.

    Args:
        workstation_cluster_id: The ID of the workstation cluster to create.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region.
    """
    client = workstations_v1.WorkstationsClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    workstation_cluster = workstations_v1.WorkstationCluster(
        display_name="Example Workstation Cluster",
        network=f"projects/{project_id}/global/networks/default",
        subnetwork=f"projects/{project_id}/regions/{location_id}/subnetworks/default",
    )

    try:
        operation = client.create_workstation_cluster(
            parent=parent,
            workstation_cluster=workstation_cluster,
            workstation_cluster_id=workstation_cluster_id,
        )
        response = operation.result()
        print(f"Created workstation cluster: {response.name}")
    except google.api_core.exceptions.ResourceExhausted as exc:
        print(f"Quota exceeded when creating workstation cluster: {exc}")
    except google.api_core.exceptions.AlreadyExists as exc:
        print(f"Workstation cluster already exists: {exc}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to create workstation cluster: {exc}")
# [END workstations_create_workstation_cluster]
