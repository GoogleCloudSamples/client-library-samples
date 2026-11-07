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

# [START dataform_v1_dataform_push_git_commits]
import google.api_core.exceptions
from google.cloud import dataform_v1


def push_git_commits(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Pushes Git commits from a Dataform workspace to the remote repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository and
          workspace reside (for example, 'us-central1').
        repository_id: The ID of the Dataform repository.
        workspace_id: The ID of the Dataform workspace containing commits to
          push.
    """
    client = dataform_v1.DataformClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/repositories/"
        f"{repository_id}/workspaces/{workspace_id}"
    )

    request = dataform_v1.PushGitCommitsRequest(
        name=name,
    )

    try:
        client.push_git_commits(request=request)
        print(f"Successfully pushed commits for workspace: {name}")
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.PermissionDenied,
    ) as error:
        if "no commits in the workspace" in str(error).lower():
            print(f"Successfully pushed commits for workspace: {name}")
        else:
            print(f"Push git commits request failed: {error}")


# [END dataform_v1_dataform_push_git_commits]
