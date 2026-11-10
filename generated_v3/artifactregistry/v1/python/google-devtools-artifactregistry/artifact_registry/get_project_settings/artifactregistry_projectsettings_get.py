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

# [START artifactregistry_v1_artifactregistry_projectsettings_get]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1

client = artifactregistry_v1.ArtifactRegistryClient()


def get_project_settings(project_id: str) -> None:
    """Retrieve the Artifact Registry project settings for a project.

    Args:
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/projectSettings"

    request = artifactregistry_v1.GetProjectSettingsRequest(
        name=name,
    )

    try:
        response = client.get_project_settings(request=request)
        print(f"Resource name: {response.name}")
        print(f"Legacy redirection state: {response.legacy_redirection_state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve project settings: {error}")
# [END artifactregistry_v1_artifactregistry_projectsettings_get]
