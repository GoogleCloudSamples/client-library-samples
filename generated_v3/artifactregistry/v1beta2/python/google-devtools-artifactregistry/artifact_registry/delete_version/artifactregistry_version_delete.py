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

# [START artifactregistry_v1beta2_artifactregistry_version_delete]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def delete_version(
    project_id: str,
    location_id: str,
    repository_id: str,
    package_id: str,
    version_id: str,
) -> None:
    """Deletes a package version from an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID hosting the repository.
        location_id: The Google Cloud region where the repository resides.
        repository_id: The Artifact Registry repository ID.
        package_id: The package ID containing the version to delete.
        version_id: The version ID to delete.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/packages/{package_id}/"
        f"versions/{version_id}"
    )

    try:
        operation = client.delete_version(name=name)
        operation.result()
        print(f"Deleted version: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete version: {error}")
# [END artifactregistry_v1beta2_artifactregistry_version_delete]
