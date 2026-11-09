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

# [START dataform_v1_dataform_query_directory_contents]
import google.api_core.exceptions
from google.cloud import dataform_v1


def query_directory_contents(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Queries the contents of a directory in a Dataform workspace.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the Dataform workspace.
        repository_id: The ID of the Dataform repository.
        workspace_id: The ID of the Dataform workspace.
    """
    client = dataform_v1.DataformClient()

    workspace = (
        f"projects/{project_id}/locations/{location_id}/repositories/"
        f"{repository_id}/workspaces/{workspace_id}"
    )

    request = dataform_v1.QueryDirectoryContentsRequest(
        workspace=workspace,
    )

    try:
        response = client.query_directory_contents(request=request)
        print(f"Queried directory contents for workspace: {workspace_id}")
        has_entries = False
        for entry in response:
            has_entries = True
            if entry.file:
                print(f"File: {entry.file}")
            elif entry.directory:
                print(f"Directory: {entry.directory}")
        if not has_entries:
            print("Directory is empty.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to query directory contents: {e}")


# [END dataform_v1_dataform_query_directory_contents]
