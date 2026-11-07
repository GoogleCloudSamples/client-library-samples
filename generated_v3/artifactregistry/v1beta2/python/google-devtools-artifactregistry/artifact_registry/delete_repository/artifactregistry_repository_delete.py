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

# [START artifactregistry_v1beta2_artifactregistry_repository_delete]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def delete_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Deletes a repository in Artifact Registry.

    Args:
        project_id: The ID of the Google Cloud project that contains the repository.
        location_id: The Cloud region or location where the repository is located.
        repository_id: The caller-chosen ID of the repository to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = artifactregistry_v1beta2.DeleteRepositoryRequest(
        name=name,
    )

    try:
        # DeleteRepository is a long-running operation.
        operation = client.delete_repository(request=request)
        print(f"Waiting for deletion operation to complete: {operation.operation.name}")
        operation.result()
        print(f"Deleted repository: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete repository: {error}")
# [END artifactregistry_v1beta2_artifactregistry_repository_delete]
