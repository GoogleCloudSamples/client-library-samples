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

# [START artifactregistry_v1_artifactregistry_pythonpackage_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def get_python_package(
    project_id: str,
    location_id: str,
    repository_id: str,
    python_package_id: str,
) -> None:
    """Retrieves metadata for a Python package in Artifact Registry.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud regional location of the repository (for
          example, 'us-central1').
        repository_id: The Artifact Registry repository ID.
        python_package_id: The identifier of the Python package (for example,
          'python_package:1.0.0').
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/repositories/"
        f"{repository_id}/pythonPackages/{python_package_id}"
    )

    request = artifactregistry_v1.GetPythonPackageRequest(name=name)

    try:
        response = client.get_python_package(request=request)
        print(f"Package Name: {response.name}")
        print(f"Package URI: {response.uri}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve Python package: {error}")


# [END artifactregistry_v1_artifactregistry_pythonpackage_get]
