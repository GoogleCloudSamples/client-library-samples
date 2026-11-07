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

# [START artifactregistry_v1_artifactregistry_version_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def get_version(
    project_id: str,
    location_id: str,
    repository_id: str,
    package_id: str,
    version_id: str,
) -> None:
    """Retrieve details for a package version in an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Cloud region or location of the repository (for example, 'us-central1').
        repository_id: The ID of the repository containing the package.
        package_id: The package ID within the repository.
        version_id: The version ID of the package.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/repositories/"
        f"{repository_id}/packages/{package_id}/versions/{version_id}"
    )

    request = artifactregistry_v1.GetVersionRequest(
        name=name,
    )

    try:
        response = client.get_version(request=request)
        print(f"Retrieved version: {response.name}")
        print(f"Create time: {response.create_time}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve version: {e.message}")
# [END artifactregistry_v1_artifactregistry_version_get]
