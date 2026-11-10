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

# [START artifactregistry_v1_artifactregistry_files_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def list_files(project_id: str, location_id: str, repository_id: str) -> None:
    """Lists files in an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location of the repository (for example, 'us-central1').
        repository_id: The Artifact Registry repository ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = artifactregistry_v1.ListFilesRequest(parent=parent)

    try:
        page_result = client.list_files(request=request)
        for artifact_file in page_result:
            print(f"File name: {artifact_file.name}")
            print(f"File size: {artifact_file.size_bytes} bytes")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list files: {error}")
# [END artifactregistry_v1_artifactregistry_files_list]
