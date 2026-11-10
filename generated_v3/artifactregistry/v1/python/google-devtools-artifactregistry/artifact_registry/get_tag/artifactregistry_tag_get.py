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

# [START artifactregistry_v1_artifactregistry_tag_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def get_tag(
    project_id: str,
    location_id: str,
    repository_id: str,
    package_id: str,
    tag_id: str,
) -> None:
    """Retrieves a tag from a package in an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the repository (for example, "us-central1").
        repository_id: The repository ID.
        package_id: The package ID.
        tag_id: The tag ID to retrieve.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/packages/{package_id}/tags/{tag_id}"
    )

    request = artifactregistry_v1.GetTagRequest(name=name)

    try:
        response = client.get_tag(request=request)
        print(f"Tag name: {response.name}")
        print(f"Resolved version: {response.version}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error retrieving tag: {error}")
# [END artifactregistry_v1_artifactregistry_tag_get]
