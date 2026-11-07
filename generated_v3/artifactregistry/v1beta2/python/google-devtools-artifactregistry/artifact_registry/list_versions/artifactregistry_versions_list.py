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

# [START artifactregistry_v1beta2_artifactregistry_versions_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def list_versions(
    project_id: str, location_id: str, repository_id: str, package_id: str
) -> None:
    """Lists versions of an Artifact Registry package.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Artifact Registry location ID (for example, 'us-central1'
          or 'us').
        repository_id: The ID of the Artifact Registry repository containing the
          package.
        package_id: The ID of the package whose versions are listed. If the
          package ID contains slashes (for example, container image names),
          format them using URL encoding.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}"
        f"/repositories/{repository_id}/packages/{package_id}"
    )

    request = artifactregistry_v1beta2.ListVersionsRequest(
        parent=parent,
    )

    try:
        response = client.list_versions(request=request)
        for version in response:
            print(f"Version name: {version.name}")
            print(f"Description: {version.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list versions: {error}")
# [END artifactregistry_v1beta2_artifactregistry_versions_list]
