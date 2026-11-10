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

# [START artifactregistry_v1beta2_artifactregistry_version_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def get_version(
    project_id: str,
    location_id: str,
    repository_id: str,
    package_id: str,
    version_id: str,
) -> None:
    """Retrieve package version details from an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID where the repository is located.
        location_id: The regional location of the repository, such as 'us-central1'.
        repository_id: The identifier of the Artifact Registry repository.
        package_id: The package identifier within the repository.
        version_id: The identifier of the version to retrieve.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/repositories/"
        f"{repository_id}/packages/{package_id}/versions/{version_id}"
    )
    view = artifactregistry_v1beta2.VersionView.FULL

    request = artifactregistry_v1beta2.GetVersionRequest(
        name=name,
        view=view,
    )

    try:
        response = client.get_version(request=request)
        print(f"Version name: {response.name}")
        print(f"Description: {response.description}")
        print(f"Create time: {response.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error retrieving version: {error}")
# [END artifactregistry_v1beta2_artifactregistry_version_get]
