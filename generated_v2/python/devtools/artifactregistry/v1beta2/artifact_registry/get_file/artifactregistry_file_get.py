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

# [START artifactregistry_v1beta2_artifactregistry_file_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def get_file(
    project_id: str, location_id: str, repository_id: str, file_id: str
) -> None:
    """Retrieve metadata for a specific file in an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or multi-region of the repository
          (for example, 'us-central1').
        repository_id: The caller-specified identifier of the repository
          containing the file.
        file_id: The identifier of the file to retrieve. If the file ID contains
          slashes, they must be URL-escaped (for example, 'a%2Fb%2Fc.txt').
    """
    file_name = (
        f"projects/{project_id}/locations/{location_id}/repositories/"
        f"{repository_id}/files/{file_id}"
    )

    request = artifactregistry_v1beta2.GetFileRequest(name=file_name)

    try:
        response = client.get_file(request=request)
        print(f"File name: {response.name}")
        print(f"Size in bytes: {response.size_bytes}")
        print(f"Create time: {response.create_time}")
        print(f"Update time: {response.update_time}")
    except google.api_core.exceptions.NotFound:
        print(f"File not found: {file_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END artifactregistry_v1beta2_artifactregistry_file_get]
