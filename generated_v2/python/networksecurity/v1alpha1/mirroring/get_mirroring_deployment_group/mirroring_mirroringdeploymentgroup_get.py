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

# [START networksecurity_v1alpha1_mirroring_mirroringdeploymentgroup_get]
import google.api_core.exceptions
from google.cloud import network_security_v1alpha1


def get_mirroring_deployment_group(
    project_id: str, location_id: str, mirroring_deployment_group_id: str
) -> None:
    """Retrieves a Mirroring Deployment Group.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        mirroring_deployment_group_id: ID of the MirroringDeploymentGroup (for example, 'example-mirroringdeploymentgroup-id').
    """
    client = network_security_v1alpha1.MirroringClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"mirroringDeploymentGroups/{mirroring_deployment_group_id}"
    )

    request = network_security_v1alpha1.GetMirroringDeploymentGroupRequest(
        name=name,
    )

    try:
        response = client.get_mirroring_deployment_group(request=request)
        print(f"Deployment group retrieved successfully: {response.name}")
        print(f"Network: {response.network}")
        print(f"State: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")


# [END networksecurity_v1alpha1_mirroring_mirroringdeploymentgroup_get]
