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

# [START dataform_v1beta1_dataform_fetch_git_ahead_behind]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def fetch_git_ahead_behind(
    project_id: str,
    location_id: str,
    repository_id: str,
    workspace_id: str,
    remote_branch: str,
) -> None:
    """Fetch the number of commits a workspace is ahead or behind a remote branch.

    Args:
        project_id: The Google Cloud project ID hosting the Dataform repository.
        location_id: The Google Cloud region where the Dataform repository is located (for example, 'us-central1').
        repository_id: The ID of the Dataform repository. Caller-chosen when creating the repository.
        workspace_id: The ID of the Dataform workspace. Caller-chosen when creating the workspace.
        remote_branch: The name of the branch in the Git remote against which this workspace is compared.
    """
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}/workspaces/{workspace_id}"

    request = dataform_v1beta1.FetchGitAheadBehindRequest(
        name=name,
        remote_branch=remote_branch,
    )

    try:
        response = client.fetch_git_ahead_behind(request=request)
        print(f"Workspace is ahead by: {response.commits_ahead} commit(s)")
        print(f"Workspace is behind by: {response.commits_behind} commit(s)")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error fetching ahead/behind status: {e.message}")
# [END dataform_v1beta1_dataform_fetch_git_ahead_behind]
