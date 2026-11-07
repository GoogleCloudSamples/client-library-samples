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

# [START artifactregistry_v1_artifactregistry_repositories_list]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def list_repositories(project_id: str, location_id: str) -> None:
    """Lists Artifact Registry repositories in a given location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or multi-region of the repositories (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = artifactregistry_v1.ListRepositoriesRequest(
        parent=parent,
    )

    try:
        response = client.list_repositories(request=request)
        for repository in response:
            print(f"Repository name: {repository.name}")
            print(f"Format: {repository.format_.name}")
            print(f"Description: {repository.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing repositories: {error}")
# [END artifactregistry_v1_artifactregistry_repositories_list]
