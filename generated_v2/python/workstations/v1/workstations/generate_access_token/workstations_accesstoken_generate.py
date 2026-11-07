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

# [START workstations_v1_workstations_generate_access_token]
import google.api_core.exceptions
from google.cloud import workstations_v1

client = workstations_v1.WorkstationsClient()


def generate_access_token(
    project_id: str,
    location_id: str,
    workstation_cluster_id: str,
    workstation_config_id: str,
    workstation_id: str,
) -> None:
    """Generate a short-lived access token for a workstation.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the workstation cluster is located.
        workstation_cluster_id: The ID of the workstation cluster.
        workstation_config_id: The ID of the workstation configuration.
        workstation_id: The ID of the workstation.
    """
    workstation = (
        f"projects/{project_id}/locations/{location_id}"
        f"/workstationClusters/{workstation_cluster_id}"
        f"/workstationConfigs/{workstation_config_id}"
        f"/workstations/{workstation_id}"
    )

    request = workstations_v1.GenerateAccessTokenRequest(
        workstation=workstation,
    )

    try:
        response = client.generate_access_token(request=request)
        print(f"Access token successfully generated for workstation: {workstation}")
        print(f"Token expiration time: {response.expire_time}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END workstations_v1_workstations_generate_access_token]
