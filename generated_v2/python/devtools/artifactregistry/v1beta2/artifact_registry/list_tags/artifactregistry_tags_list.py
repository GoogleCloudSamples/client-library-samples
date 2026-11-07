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

# [START artifactregistry_v1beta2_artifactregistry_tags_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def list_tags(
    project_id: str, location_id: str, repository_id: str, package_id: str
) -> None:
    """Lists tags associated with a package in Artifact Registry.

    Args:
        project_id: The ID of the Google Cloud project hosting the Artifact
          Registry repository.
        location_id: The Cloud region or multi-region of the repository (for
          example, 'us-central1').
        repository_id: The ID of the Artifact Registry repository containing the
          package.
        package_id: The name or ID of the package whose tags are listed. If the
          package name contains slashes, escape them.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/repositories/"
        f"{repository_id}/packages/{package_id}"
    )

    request = artifactregistry_v1beta2.ListTagsRequest(
        parent=parent,
    )

    try:
        response = client.list_tags(request=request)
        for tag in response:
            print(f"Tag name: {tag.name}")
            print(f"Tag version: {tag.version}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list tags: {error}")


# [END artifactregistry_v1beta2_artifactregistry_tags_list]
