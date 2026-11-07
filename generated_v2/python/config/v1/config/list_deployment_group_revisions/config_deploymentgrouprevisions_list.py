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

# [START config_list_deployment_group_revisions]
from google.api_core import exceptions
from google.cloud import config_v1


def list_deployment_group_revisions(
    project_id: str, location_id: str, deployment_group_id: str
) -> None:
    """Lists deployment group revisions for a deployment group.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'us-central1').
        deployment_group_id: The deployment group ID (for example, 'example-deployment-group-id').
    """
    client = config_v1.ConfigClient()

    parent = f"projects/{project_id}/locations/{location_id}/deploymentGroups/{deployment_group_id}"

    request = config_v1.ListDeploymentGroupRevisionsRequest(
        parent=parent,
    )

    try:
        response = client.list_deployment_group_revisions(request=request)
        print(f"Deployment group revisions for {deployment_group_id}:")
        for revision in response:
            print(f"- {revision.name}")
    except exceptions.NotFound:
        print(f"Deployment group '{deployment_group_id}' was not found.")
    except exceptions.GoogleAPICallError as error:
        print(f"Google API call failed: {error.message}")
# [END config_list_deployment_group_revisions]
