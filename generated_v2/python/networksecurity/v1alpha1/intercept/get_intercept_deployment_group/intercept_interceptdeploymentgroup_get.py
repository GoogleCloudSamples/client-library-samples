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

# [START networksecurity_v1alpha1_intercept_interceptdeploymentgroup_get]
import google.api_core.exceptions
from google.cloud import network_security_v1alpha1


def get_intercept_deployment_group(
    project_id: str, location_id: str, intercept_deployment_group_id: str
) -> None:
    """Retrieves an intercept deployment group resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location for the deployment group (typically 'global').
        intercept_deployment_group_id: The ID of the intercept deployment group to retrieve.
    """
    client = network_security_v1alpha1.InterceptClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"interceptDeploymentGroups/{intercept_deployment_group_id}"
    )

    try:
        response = client.get_intercept_deployment_group(name=name)
        print(f"Deployment group name: {response.name}")
        print(f"Deployment group state: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve intercept deployment group: {e}")
# [END networksecurity_v1alpha1_intercept_interceptdeploymentgroup_get]
