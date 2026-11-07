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

# [START artifactregistry_v1_artifactregistry_mavenartifact_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def get_maven_artifact(
    project_id: str,
    location_id: str,
    repository_id: str,
    maven_artifact_id: str,
) -> None:
    """Retrieves metadata for a specific Maven artifact in Artifact Registry.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Artifact Registry repository location (for example,
          us-central1).
        repository_id: The identifier of the Maven repository.
        maven_artifact_id: The Maven artifact identifier, formatted as
          groupId:artifactId:version (for example,
          com.google.guava:guava:31.0-jre).
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/repositories/"
        f"{repository_id}/mavenArtifacts/{maven_artifact_id}"
    )

    try:
        response = client.get_maven_artifact(name=name)
        print(f"Artifact Name: {response.name}")
        print(f"Group ID: {response.group_id}")
        print(f"Artifact ID: {response.artifact_id}")
        print(f"Version: {response.version}")
    except google.api_core.exceptions.NotFound:
        print(f"Artifact not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve artifact: {error}")
# [END artifactregistry_v1_artifactregistry_mavenartifact_get]
