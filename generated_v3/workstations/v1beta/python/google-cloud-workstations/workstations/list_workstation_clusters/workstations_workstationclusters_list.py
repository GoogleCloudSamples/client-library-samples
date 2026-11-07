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

# [START workstations_v1beta_workstations_workstationclusters_list]
import google.api_core.exceptions
from google.cloud import workstations_v1beta

client = workstations_v1beta.WorkstationsClient()


def list_workstation_clusters(project_id: str, location_id: str) -> None:
    """Lists workstation clusters in a specified project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where workstation clusters are
            located (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = workstations_v1beta.ListWorkstationClustersRequest(
            parent=parent,
        )
        clusters = client.list_workstation_clusters(request=request)

        for cluster in clusters:
            print(f"Cluster name: {cluster.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing workstation clusters: {error}")
# [END workstations_v1beta_workstations_workstationclusters_list]
