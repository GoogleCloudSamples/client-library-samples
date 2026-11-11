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

# [START workstations_v1beta_workstations_workstationcluster_create]
import google.api_core.exceptions
import google.auth
from google.cloud import workstations_v1beta


def create_workstation_cluster(workstation_cluster_id: str) -> None:
    """Creates a workstation cluster in a Google Cloud project and location.

    Args:
        workstation_cluster_id: ID of the WorkstationCluster (for example, 'example-workstation-cluster-id').
    """
    client = workstations_v1beta.WorkstationsClient()

    _, project_id = google.auth.default()
    location = "us-central1"

    parent = f"projects/{project_id}/locations/{location}"
    network = f"projects/{project_id}/global/networks/default"
    subnetwork = f"projects/{project_id}/regions/{location}/subnetworks/default"

    workstation_cluster = workstations_v1beta.WorkstationCluster(
        network=network,
        subnetwork=subnetwork,
    )

    try:
        operation = client.create_workstation_cluster(
            parent=parent,
            workstation_cluster_id=workstation_cluster_id,
            workstation_cluster=workstation_cluster,
        )
        response = operation.result()
        print(f"Created workstation cluster: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Operation failed: {e}")
# [END workstations_v1beta_workstations_workstationcluster_create]
