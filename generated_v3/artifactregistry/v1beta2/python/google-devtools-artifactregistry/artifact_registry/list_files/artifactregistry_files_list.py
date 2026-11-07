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

# [START artifactregistry_v1beta2_artifactregistry_files_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1beta2

client = artifactregistry_v1beta2.ArtifactRegistryClient()


def list_files(project_id: str, location_id: str, repository_id: str) -> None:
    """Lists files in an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID hosting the repository.
        location_id: The regional or multi-regional location of the repository (for example, 'us-central1').
        repository_id: The ID of the repository whose files will be listed.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )

    request = artifactregistry_v1beta2.ListFilesRequest(
        parent=parent,
    )

    try:
        response = client.list_files(request=request)
        for file in response:
            print(f"File name: {file.name}")
            print(f"Size in bytes: {file.size_bytes}")
            print(f"Create time: {file.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing files: {error}")
# [END artifactregistry_v1beta2_artifactregistry_files_list]
