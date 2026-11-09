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

# [START dataform_v1_dataform_fetch_file_git_statuses]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def fetch_file_git_statuses(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Fetch uncommitted Git file statuses for a Dataform workspace.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The region/location of the Dataform repository (for example, 'us-central1').
        repository_id: The ID of the Dataform repository containing the workspace.
        workspace_id: The ID of the Dataform workspace to inspect.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/workspaces/{workspace_id}"
    )

    request = dataform_v1.FetchFileGitStatusesRequest(name=name)

    try:
        response = client.fetch_file_git_statuses(request=request)
        print(f"Fetched Git file statuses for workspace: {name}")
        for file_change in response.uncommitted_file_changes:
            print(f"File: {file_change.path}, Status: {file_change.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END dataform_v1_dataform_fetch_file_git_statuses]
