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

# [START dataform_v1_dataform_fetch_file_diff]
import os

import google.api_core.exceptions
from google.cloud import dataform_v1


def fetch_file_diff() -> None:
    """Fetches the diff of a file in a Dataform workspace."""
    client = dataform_v1.DataformClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    location = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")
    repository_id = os.environ.get("DATAFORM_REPOSITORY", "example-repository-id")
    workspace_id = os.environ.get("DATAFORM_WORKSPACE", "example-workspace-id")

    workspace = (
        f"projects/{project_id}/locations/{location}/"
        f"repositories/{repository_id}/workspaces/{workspace_id}"
    )
    path = os.environ.get("DATAFORM_PATH", "definitions/example_table.sqlx")

    parent = f"projects/{project_id}/locations/{location}"
    repo_name = f"{parent}/repositories/{repository_id}"

    # Create prerequisite repository, workspace, and file if they do not exist
    try:
        client.create_repository(
            request=dataform_v1.CreateRepositoryRequest(
                parent=parent,
                repository_id=repository_id,
                repository=dataform_v1.Repository(),
            )
        )
    except (
        google.api_core.exceptions.AlreadyExists,
        google.api_core.exceptions.GoogleAPICallError,
    ):
        pass

    try:
        client.create_workspace(
            request=dataform_v1.CreateWorkspaceRequest(
                parent=repo_name,
                workspace_id=workspace_id,
                workspace=dataform_v1.Workspace(),
            )
        )
    except (
        google.api_core.exceptions.AlreadyExists,
        google.api_core.exceptions.GoogleAPICallError,
    ):
        pass

    try:
        client.write_file(
            request=dataform_v1.WriteFileRequest(
                workspace=workspace,
                path=path,
                contents=b"-- example query\nSELECT 1 AS id;\n",
            )
        )
    except (
        google.api_core.exceptions.AlreadyExists,
        google.api_core.exceptions.GoogleAPICallError,
    ):
        pass

    request = dataform_v1.FetchFileDiffRequest(
        workspace=workspace,
        path=path,
    )

    try:
        response = client.fetch_file_diff(request=request)
        print(f"File diff: {response.formatted_diff}")
    except (
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.PermissionDenied,
    ) as exc:
        print(f"API call failed: {exc}")
# [END dataform_v1_dataform_fetch_file_diff]
