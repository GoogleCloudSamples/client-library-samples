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

# [START artifactregistry_v1_artifactregistry_tags_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def list_tags(
    project_id: str, location_id: str, repository_id: str, package_id: str
) -> None:
    """Lists tags for a specified package in Artifact Registry.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the repository (for
          example, 'us-central1').
        repository_id: The name or ID of the Artifact Registry repository.
        package_id: The ID of the package whose tags will be listed. Slashes
          must be escaped or URL-encoded if present.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}"
        f"/repositories/{repository_id}/packages/{package_id}"
    )

    request = artifactregistry_v1.ListTagsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_tags(request=request)
        for tag in page_result:
            print(f"Tag Name: {tag.name}")
            print(f"Version: {tag.version}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list tags: {e}")


# [END artifactregistry_v1_artifactregistry_tags_list]
