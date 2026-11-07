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

# [START dataform_v1beta1_dataform_workspace_delete]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def delete_workspace(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Deletes an existing Dataform workspace.

    Args:
        project_id: The Google Cloud project ID harboring the target Dataform workspace.
        location_id: The region where the repository and workspace are located.
        repository_id: The ID of the existing Dataform repository hosting the workspace.
        workspace_id: The ID of the Dataform workspace to delete.
    """
    name = client.workspace_path(
        project_id, location_id, repository_id, workspace_id
    )

    try:
        client.delete_workspace(name=name)
        print(f"Deleted workspace: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Workspace not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to delete workspace: {exc}")
# [END dataform_v1beta1_dataform_workspace_delete]
