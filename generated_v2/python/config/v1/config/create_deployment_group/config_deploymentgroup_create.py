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

# [START infra-manager_v1_config_deploymentgroup_create]
from google.api_core import exceptions
from google.cloud import config_v1


def create_deployment_group(
    project_id: str, location_id: str, deployment_group_id: str
) -> None:
    """Use the create_deployment_group method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        deployment_group_id: ID of the DeploymentGroup (for example, 'example-deploymentgroup-id')
    """
    client = config_v1.ConfigClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    deployment_group = config_v1.DeploymentGroup()

    request = config_v1.CreateDeploymentGroupRequest(
        parent=parent,
        deployment_group_id=deployment_group_id,
        deployment_group=deployment_group,
    )

    try:
        operation = client.create_deployment_group(request=request)
        response = operation.result()
        print(f"Created deployment group: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to create deployment group: {e}")


# [END infra-manager_v1_config_deploymentgroup_create]
