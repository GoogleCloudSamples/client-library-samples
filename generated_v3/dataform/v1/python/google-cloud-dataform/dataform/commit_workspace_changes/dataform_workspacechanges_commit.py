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

# [START dataform_v1_dataform_commit_workspace_changes]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def commit_workspace_changes(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Commit changes to a Dataform workspace.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository is located (for example, us-central1).
        repository_id: The caller-chosen ID of the Dataform repository.
        workspace_id: The caller-chosen ID of the Dataform workspace.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}/"
        f"workspaces/{workspace_id}"
    )
    author = dataform_v1.CommitAuthor(
        name="Sample Committer",
        email_address="committer@example.com",
    )

    request = dataform_v1.CommitWorkspaceChangesRequest(
        name=name,
        author=author,
        commit_message="Commit workspace changes",
    )

    try:
        client.commit_workspace_changes(request=request)
        print(f"Successfully committed changes to workspace: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dataform_v1_dataform_commit_workspace_changes]
