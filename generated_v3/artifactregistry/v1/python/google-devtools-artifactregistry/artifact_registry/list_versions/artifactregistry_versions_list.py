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

# [START artifactregistry_v1_artifactregistry_versions_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def list_versions(
    project_id: str, location_id: str, repository_id: str, package_id: str
) -> None:
    """Lists versions of a package in Google Cloud Artifact Registry.

    Args:
        project_id: The Google Cloud project ID hosting the repository.
        location_id: The location or region of the repository (for example, 'us-central1').
        repository_id: The repository identifier containing lowercase letters, digits, and hyphens.
        package_id: The package identifier within the repository (percent-encode any slashes).
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/packages/{package_id}"
    )

    request = artifactregistry_v1.ListVersionsRequest(parent=parent)

    try:
        response = client.list_versions(request=request)
        for version in response:
            print(f"Version name: {version.name}")
            print(f"Description: {version.description}")
            print(f"Create time: {version.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list versions: {error.message}")
# [END artifactregistry_v1_artifactregistry_versions_list]
