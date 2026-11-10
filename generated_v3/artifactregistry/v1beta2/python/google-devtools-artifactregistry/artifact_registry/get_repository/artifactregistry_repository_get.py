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

# [START artifactregistry_v1beta2_artifactregistry_repository_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def get_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Retrieves an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (region or multi-region) of the repository.
        repository_id: The caller-specified ID of the repository to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = artifactregistry_v1beta2.GetRepositoryRequest(name=name)

    try:
        response = client.get_repository(request=request)
        print(f"Repository name: {response.name}")
        print(f"Format: {response.format_.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve repository: {e}")
# [END artifactregistry_v1beta2_artifactregistry_repository_get]
