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

# [START artifactregistry_v1beta2_artifactregistry_repository_create]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def create_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Creates an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud regional location for the repository.
        repository_id: The repository identifier to create.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    repository = artifactregistry_v1beta2.Repository(
        format_=artifactregistry_v1beta2.Repository.Format.DOCKER,
        description="Docker repository created via API.",
    )

    try:
        operation = client.create_repository(
            parent=parent,
            repository_id=repository_id,
            repository=repository,
        )
        response = operation.result()
        print(f"Created repository: {response.name}")
    except google.api_core.exceptions.AlreadyExists as err:
        print(f"Repository already exists: {err.message}")
    except google.api_core.exceptions.GoogleAPICallError as err:
        print(f"Failed to create repository: {err.message}")
# [END artifactregistry_v1beta2_artifactregistry_repository_create]
