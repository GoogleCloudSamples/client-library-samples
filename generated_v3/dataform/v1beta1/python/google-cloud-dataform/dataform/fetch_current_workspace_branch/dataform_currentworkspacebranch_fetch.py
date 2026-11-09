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

import google.api_core.exceptions
from google.cloud import dataform_v1beta1


def fetch_current_workspace_branch(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Fetches the current branch for a Dataform workspace.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository is
          located (for example, 'us-central1').
        repository_id: The caller-chosen ID of the Dataform repository.
        workspace_id: The caller-chosen ID of the Dataform workspace.
    """
    client = dataform_v1beta1.DataformClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/workspaces/{workspace_id}"
    )

    request = dataform_v1beta1.FetchCurrentWorkspaceBranchRequest(name=name)

    try:
        response = client.fetch_current_workspace_branch(request=request)
        print(f"Current workspace branch: {response.branch}")
    except google.api_core.exceptions.BadRequest as e:
        # Workspaces without linked Git branch management raise 400 Bad Request.
        print(f"Branch management is not enabled for workspace {workspace_id}: {e}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to fetch current workspace branch: {e}")
