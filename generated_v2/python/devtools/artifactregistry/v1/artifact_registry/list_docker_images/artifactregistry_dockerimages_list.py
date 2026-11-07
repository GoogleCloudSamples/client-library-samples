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

# [START artifactregistry_v1_artifactregistry_dockerimages_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1


def list_docker_images(project_id: str, location_id: str, repository_id: str) -> None:
    """Lists Docker images in an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID hosting the repository.
        location_id: The Google Cloud location of the repository, for example,
          'us-central1' or 'us'.
        repository_id: The ID of an existing Artifact Registry Docker
          repository.
    """
    client = artifactregistry_v1.ArtifactRegistryClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    request = artifactregistry_v1.ListDockerImagesRequest(
        parent=parent,
    )

    try:
        response = client.list_docker_images(request=request)
        found_images = False
        for image in response:
            found_images = True
            print(f"Docker Image Name: {image.name}")
            print(f"URI: {image.uri}")
            print(f"Tags: {list(image.tags)}")

        if not found_images:
            print(f"No Docker images found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list Docker images: {error}")
# [END artifactregistry_v1_artifactregistry_dockerimages_list]
