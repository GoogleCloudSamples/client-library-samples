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

# [START artifactregistry_v1beta2_artifactregistry_tag_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def get_tag(project_id: str, location_id: str, repository_id: str, package_id: str, tag_id: str) -> None:
    """Use the get_tag method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The regional or multi-regional location of the Artifact Registry repository (e.g., 'us-central1').
        repository_id: The ID of the repository containing the package.
        package_id: The ID of the package containing the tag.
        tag_id: The identifier of the tag to retrieve (e.g., 'release-v1').
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/repositories/"
        f"{repository_id}/packages/{package_id}/tags/{tag_id}"
    )

    request = artifactregistry_v1beta2.GetTagRequest(
        name=name,
    )

    try:
        response = client.get_tag(request=request)
        print(f"Tag: {response.name}")
        print(f"Version: {response.version}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error retrieving tag: {error}")
# [END artifactregistry_v1beta2_artifactregistry_tag_get]
