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

# [START artifactregistry_v1beta2_artifactregistry_repository_update]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2
from google.protobuf import field_mask_pb2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def update_repository(project_id: str, location_id: str, repository_id: str) -> None:
    """Updates an Artifact Registry repository description.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the repository (for
            example, 'us-central1').
        repository_id: The ID of the repository to update.
    """
    repository = artifactregistry_v1beta2.Repository(
        name=f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}",
        description="Updated repository description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        response = client.update_repository(
            repository=repository, update_mask=update_mask
        )
        print(f"Repository updated: {response.name}")
        print(f"New description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END artifactregistry_v1beta2_artifactregistry_repository_update]
