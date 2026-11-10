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

# [START artifactregistry_v1_artifactregistry_npmpackages_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1


def list_npm_packages(project_id: str, location_id: str, repository_id: str) -> None:
    """List npm packages in an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the repository (for example, 'us-central1').
        repository_id: The Artifact Registry repository ID containing npm packages.
    """
    client = artifactregistry_v1.ArtifactRegistryClient()

    parent = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = artifactregistry_v1.ListNpmPackagesRequest(
        parent=parent,
    )

    try:
        response = client.list_npm_packages(request=request)
        count = 0
        for package in response:
            print(f"Package name: {package.name}")
            count += 1

        if count == 0:
            print(f"No npm packages found in repository '{repository_id}'.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list npm packages: {error}")
# [END artifactregistry_v1_artifactregistry_npmpackages_list]
