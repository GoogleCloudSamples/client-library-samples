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

# [START dataform_v1_dataform_commit_repository_changes]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def commit_repository_changes(project_id: str, location_id: str, repository_id: str) -> None:
    """Commit changes to a Dataform repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Dataform region or location (for example, us-central1).
        repository_id: The caller-chosen ID of an existing Dataform repository.
    """
    commit_metadata = dataform_v1.CommitMetadata(
        author=dataform_v1.CommitAuthor(
            name="Example Developer",
            email_address="developer@example.com",
        ),
        commit_message="Add initial view definition",
    )
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    # Define the files to add, update, or delete in the repository
    file_operations = {
        "definitions/example_view.sqlx": dataform_v1.CommitRepositoryChangesRequest.FileOperation(
            write_file=dataform_v1.CommitRepositoryChangesRequest.FileOperation.WriteFile(
                contents=b"config { type: 'view' }\nSELECT 1 AS id\n"
            )
        )
    }

    request = dataform_v1.CommitRepositoryChangesRequest(
        name=name,
        commit_metadata=commit_metadata,
        file_operations=file_operations,
    )

    try:
        client.commit_repository_changes(request=request)
        print(f"Committed changes to repository: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to commit repository changes: {e}")
# [END dataform_v1_dataform_commit_repository_changes]
