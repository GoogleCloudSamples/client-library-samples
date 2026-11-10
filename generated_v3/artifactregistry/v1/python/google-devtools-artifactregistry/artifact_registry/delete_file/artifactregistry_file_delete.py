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

# [START artifactregistry_v1_artifactregistry_file_delete]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def delete_file(
    project_id: str, location_id: str, repository_id: str, file_id: str
) -> None:
    """Deletes a file from a generic Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the repository.
        repository_id: The Artifact Registry repository ID. DeleteFile is only supported on generic repositories.
        file_id: The ID of the file to delete. Slashes in the file ID must be URI-escaped (for example, 'a%2Fb%2Fc.txt').
    """
    name = client.file_path(project_id, location_id, repository_id, file_id)

    try:
        # DeleteFile initiates a long-running operation on generic repositories.
        operation = client.delete_file(name=name)
        operation.result()
        print(f"Deleted file: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete file: {error}")
# [END artifactregistry_v1_artifactregistry_file_delete]
