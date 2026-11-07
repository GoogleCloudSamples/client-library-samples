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

# [START dataform_v1_dataform_workspaces_list]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def list_workspaces(project_id: str, location_id: str, repository_id: str) -> None:
    """Lists workspaces in a Dataform repository.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        repository_id: ID of the Repository (for example, 'example-repository-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = dataform_v1.ListWorkspacesRequest(parent=parent)

    try:
        response = client.list_workspaces(request=request)
        for workspace in response:
            print(f"Workspace: {workspace.name}")
    except google.api_core.exceptions.GoogleAPIError as exception:
        print(f"API request failed: {exception}")
# [END dataform_v1_dataform_workspaces_list]
