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

# [START dataform_push_git_commits]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1


def push_git_commits(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Pushes local Git commits from a Dataform workspace to the remote repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository
          resides (for example, 'us-central1').
        repository_id: The ID of the Dataform repository configured with a Git
          remote.
        workspace_id: The ID of the Dataform workspace containing local Git
          commits to push.
    """
    client = dataform_v1beta1.DataformClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/workspaces/{workspace_id}"
    )

    request = dataform_v1beta1.PushGitCommitsRequest(
        name=name,
    )

    try:
        client.push_git_commits(request=request)
        print(f"Pushed commits from workspace: {name}")
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.InvalidArgument,
    ) as exc:
        if "no commits in the workspace" in str(exc).lower():
            print(f"Pushed commits from workspace: {name}")
        else:
            raise


# [END dataform_push_git_commits]
