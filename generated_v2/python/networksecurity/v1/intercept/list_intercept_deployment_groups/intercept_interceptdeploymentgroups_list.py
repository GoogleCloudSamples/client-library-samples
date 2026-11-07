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

# [START networksecurity_v1_intercept_interceptdeploymentgroups_list]
import google.api_core.exceptions
from google.cloud import network_security_v1


def list_intercept_deployment_groups(project_id: str, location_id: str) -> None:
    """Lists intercept deployment groups in a project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (typically 'global' for InterceptDeploymentGroups).
    """
    client = network_security_v1.InterceptClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_security_v1.ListInterceptDeploymentGroupsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_intercept_deployment_groups(request=request)
        for deployment_group in page_result:
            print(f"Deployment group: {deployment_group.name}")
            print(f"Network: {deployment_group.network}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list intercept deployment groups: {error}")
# [END networksecurity_v1_intercept_interceptdeploymentgroups_list]
