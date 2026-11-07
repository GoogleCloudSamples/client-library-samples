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

# [START artifactregistry_v1_artifactregistry_repository_delete]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def delete_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Deletes an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or multi-region of the repository
          (for example, 'us-central1' or 'us').
        repository_id: The ID of the repository to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = artifactregistry_v1.DeleteRepositoryRequest(
        name=name,
    )

    try:
        # DeleteRepository returns a long-running operation.
        operation = client.delete_repository(request=request)
        operation.result()
        print(f"Deleted repository: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete repository: {e}")
# [END artifactregistry_v1_artifactregistry_repository_delete]
