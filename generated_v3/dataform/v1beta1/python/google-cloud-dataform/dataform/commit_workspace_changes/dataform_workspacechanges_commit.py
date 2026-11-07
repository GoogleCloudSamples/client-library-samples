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

# [START dataform_v1beta1_dataform_commit_workspace_changes]
from google.api_core import exceptions
from google.cloud import dataform_v1beta1


def commit_workspace_changes(
    project_id: str,
    location_id: str,
    repository_id: str,
    workspace_id: str,
) -> None:
    """Commits changes in a Dataform workspace.

    Args:
        project_id: The Google Cloud project ID hosting the Dataform repository.
        location_id: The Google Cloud region of the Dataform repository.
        repository_id: The ID of the target Dataform repository.
        workspace_id: The ID of the Dataform workspace containing uncommitted changes.
    """
    client = dataform_v1beta1.DataformClient()

    author = dataform_v1beta1.CommitAuthor(
        name="Sample Committer",
        email_address="committer@example.com",
    )
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/workspaces/{workspace_id}"
    )

    request = dataform_v1beta1.CommitWorkspaceChangesRequest(
        name=name,
        author=author,
        commit_message="Commit workspace changes",
    )

    try:
        client.commit_workspace_changes(request=request)
        print(f"Committed changes in workspace: {name}")
    except exceptions.GoogleAPICallError as err:
        print(f"Failed to commit workspace changes: {err}")
# [END dataform_v1beta1_dataform_commit_workspace_changes]
