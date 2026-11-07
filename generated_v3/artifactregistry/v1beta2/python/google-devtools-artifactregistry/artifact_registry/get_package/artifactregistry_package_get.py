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

# [START artifactregistry_v1beta2_artifactregistry_package_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def get_package(
    project_id: str, location_id: str, repository_id: str, package_id: str
) -> None:
    """Use the get_package method to retrieve a package from Artifact Registry.

    Args:
        project_id: The ID of the Google Cloud project containing the repository.
        location_id: The location of the repository, such as a region (for
          example, 'us-central1') or multiregion (for example, 'us').
        repository_id: The name or ID of the Artifact Registry repository
          containing the package.
        package_id: The ID or name of the package to retrieve. For formats like
          Maven, npm, or Docker, characters such as slashes or colons may need
          URL-encoding (for example, %2F).
    """
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}/packages/{package_id}"

    try:
        response = client.get_package(name=name)
        print(f"Package name: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to retrieve package: {exc}")
# [END artifactregistry_v1beta2_artifactregistry_package_get]
