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

# [START dataform_v1_dataform_files_search]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def search_files(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Searches files within a Dataform workspace.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the Dataform repository (for
          example, 'us-central1').
        repository_id: The ID of the Dataform repository.
        workspace_id: The ID of the Dataform workspace.
    """
    workspace = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/workspaces/{workspace_id}"
    )

    request = dataform_v1.SearchFilesRequest(
        workspace=workspace,
    )

    try:
        response = client.search_files(request=request)
        count = 0
        for result in response:
            print(f"Found search result: {result}")
            count += 1
        print(f"Search completed for workspace '{workspace}': found {count} results.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API request failed: {e}")
# [END dataform_v1_dataform_files_search]
