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

# [START infra-manager_v1_config_deploymentgroups_list]
import google.api_core.exceptions
from google.cloud import config_v1


def list_deployment_groups(project_id: str, location_id: str) -> None:
    """Lists deployment groups in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = config_v1.ConfigClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = config_v1.ListDeploymentGroupsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_deployment_groups(request=request)
        for deployment_group in page_result:
            print(f"Deployment group: {deployment_group.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing deployment groups: {error}")
# [END infra-manager_v1_config_deploymentgroups_list]
