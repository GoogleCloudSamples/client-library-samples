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

# [START dataform_v1_dataform_query_repository_directory_contents]
import google.api_core.exceptions
from google.cloud import dataform_v1


def query_repository_directory_contents(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Queries the contents of an unlinked Dataform repository directory.

    Args:
        project_id: The Google Cloud project ID hosting the repository.
        location_id: The Google Cloud region where the repository resides.
        repository_id: The ID of the Dataform repository.
    """
    client = dataform_v1.DataformClient()
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = dataform_v1.QueryRepositoryDirectoryContentsRequest(
        name=name,
    )

    try:
        response = client.query_repository_directory_contents(request=request)
    except google.api_core.exceptions.GoogleAPICallError as error:
        if "empty repo" in str(error).lower():
            # An unlinked repository requires at least one commit before directory contents can be queried.
            commit_metadata = dataform_v1.CommitMetadata(
                author=dataform_v1.CommitAuthor(
                    name="Dataform User",
                    email_address="example@example.com",
                ),
                commit_message="Initial commit",
            )
            readme_action = (
                dataform_v1.CommitRepositoryChangesRequest.FileOperation.WriteFile(
                    contents=b"# Example Dataform Repository\n"
                )
            )
            readme_op = dataform_v1.CommitRepositoryChangesRequest.FileOperation(
                write_file=readme_action
            )
            sqlx_action = (
                dataform_v1.CommitRepositoryChangesRequest.FileOperation.WriteFile(
                    contents=b"config { type: 'view' }\nSELECT 1 AS sample"
                )
            )
            sqlx_op = dataform_v1.CommitRepositoryChangesRequest.FileOperation(
                write_file=sqlx_action
            )
            commit_request = dataform_v1.CommitRepositoryChangesRequest(
                name=name,
                commit_metadata=commit_metadata,
                file_operations={
                    "README.md": readme_op,
                    "definitions/sample.sqlx": sqlx_op,
                },
            )
            client.commit_repository_changes(request=commit_request)
            response = client.query_repository_directory_contents(request=request)
        else:
            raise

    for entry in response:
        if entry.file:
            print(f"File: {entry.file}")
        elif entry.directory:
            print(f"Directory: {entry.directory}")
# [END dataform_v1_dataform_query_repository_directory_contents]
