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

# [START dataform_v1beta1_dataform_fetch_workspace_branches]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1


def fetch_workspace_branches(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Fetches Git branches for a Dataform workspace.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository is
          located (for example, 'us-central1').
        repository_id: The caller-assigned ID of the Dataform repository (for
          example, 'example-repository').
        workspace_id: The caller-assigned ID of the Dataform workspace (for
          example, 'example-workspace').
    """
    client = dataform_v1beta1.DataformClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/workspaces/{workspace_id}"
    )

    request = dataform_v1beta1.FetchWorkspaceBranchesRequest(
        name=name,
    )

    try:
        response = client.fetch_workspace_branches(request=request)
        print(f"Workspace: {name}")
        for branch in response.branches:
            print(f"Found branch: {branch}")
    except google.api_core.exceptions.FailedPrecondition:
        print(f"Workspace {name} does not have branch management enabled.")
    except google.api_core.exceptions.InvalidArgument as exc:
        print(f"Invalid argument for workspace {name}: {exc}")
# [END dataform_v1beta1_dataform_fetch_workspace_branches]
