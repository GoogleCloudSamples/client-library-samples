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

# [START dataform_v1_dataform_workspace_delete]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def delete_workspace(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Deletes a Dataform workspace.

    Args:
        project_id: Google Cloud project ID hosting the Dataform repository.
        location_id: Google Cloud region of the Dataform repository (for example, 'us-central1').
        repository_id: ID of the Dataform repository.
        workspace_id: ID of the Dataform workspace to delete.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/workspaces/{workspace_id}"
    )

    try:
        # Delete the specified workspace
        client.delete_workspace(name=name)
        print(f"Deleted workspace: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete workspace: {error}")
# [END dataform_v1_dataform_workspace_delete]
