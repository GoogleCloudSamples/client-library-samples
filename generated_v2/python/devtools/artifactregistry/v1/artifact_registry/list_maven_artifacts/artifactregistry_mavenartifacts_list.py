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

# [START artifactregistry_v1_artifactregistry_mavenartifacts_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def list_maven_artifacts(
    project_id: str, location_id: str, repository_id: str
) -> None:
    """Use the list_maven_artifacts method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The regional or multi-regional location of the repository
          (for example, 'us-central1' or 'us').
        repository_id: The ID of the Artifact Registry repository containing
          Maven artifacts.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    request = artifactregistry_v1.ListMavenArtifactsRequest(
        parent=parent,
    )

    try:
        response = client.list_maven_artifacts(request=request)
        for artifact in response:
            print(f"Artifact Name: {artifact.name}")
            print(f"Group ID: {artifact.group_id}")
            print(f"Artifact ID: {artifact.artifact_id}")
            print(f"Version: {artifact.version}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list Maven artifacts: {error}")


# [END artifactregistry_v1_artifactregistry_mavenartifacts_list]
