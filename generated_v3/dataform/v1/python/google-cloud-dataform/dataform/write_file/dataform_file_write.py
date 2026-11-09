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

# [START dataform_v1_dataform_write_file]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def write_file(
    project_id: str, location_id: str, repository_id: str, workspace_id: str
) -> None:
    """Writes a file to a Dataform workspace.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository and workspace reside.
        repository_id: The ID of the Dataform repository.
        workspace_id: The ID of the Dataform workspace.
    """
    path = "definitions/example.sqlx"
    contents = b'config { type: "view" }\nSELECT 1 AS count;'
    workspace = (
        f"projects/{project_id}/locations/{location_id}"
        f"/repositories/{repository_id}/workspaces/{workspace_id}"
    )

    request = dataform_v1.WriteFileRequest(
        workspace=workspace,
        path=path,
        contents=contents,
    )

    try:
        client.write_file(request=request)
        print(f"Successfully wrote file '{path}' to workspace '{workspace}'.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to write file: {error}")


# [END dataform_v1_dataform_write_file]
