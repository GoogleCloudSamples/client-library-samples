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

# [START artifactregistry_v1_artifactregistry_file_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def get_file(
    project_id: str, location_id: str, repository_id: str, file_id: str
) -> None:
    """Retrieve metadata for a specific file in Artifact Registry.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location of the Artifact Registry repository (for example, "us-central1").
        repository_id: The ID of the Artifact Registry repository.
        file_id: The ID of the file or its URL-escaped path if it contains slashes (for example, "file.txt" or "a%2Fb%2Fc.txt").
    """
    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}/files/{file_id}"

    request = artifactregistry_v1.GetFileRequest(
        name=name,
    )

    try:
        response = client.get_file(request=request)
        print(f"Retrieved file: {response.name}")
        print(f"File size in bytes: {response.size_bytes}")
        print(f"Create time: {response.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve file: {error}")
# [END artifactregistry_v1_artifactregistry_file_get]
