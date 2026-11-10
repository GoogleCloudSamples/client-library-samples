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

# [START artifactregistry_v1_artifactregistry_package_delete]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def delete_package(
    project_id: str, location_id: str, repository_id: str, package_id: str
) -> None:
    """Delete a package from an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or multi-region of the repository.
        repository_id: The Artifact Registry repository ID containing the package.
        package_id: The ID of the package to delete. If the package ID contains
          slashes, they must be escaped.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/packages/{package_id}"
    )

    try:
        operation = client.delete_package(name=name)
        # DeletePackage returns a long-running operation; wait for completion.
        operation.result()
        print(f"Deleted package: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete package: {error}")
# [END artifactregistry_v1_artifactregistry_package_delete]
