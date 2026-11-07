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

# [START dataform_v1_dataform_releaseconfig_create]
import google.api_core.exceptions
from google.cloud import dataform_v1


def create_release_config(
    project_id: str,
    location_id: str,
    repository_id: str,
    release_config_id: str,
) -> None:
    """Creates a release configuration in a Dataform repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository is
          located (for example, 'us-central1').
        repository_id: The ID of the Dataform repository.
        release_config_id: The ID of the ReleaseConfig to create.
    """
    client = dataform_v1.DataformClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"
    )
    release_config = dataform_v1.ReleaseConfig(
        git_commitish="main",
    )

    try:
        response = client.create_release_config(
            parent=parent,
            release_config_id=release_config_id,
            release_config=release_config,
        )
        print(f"Created release config: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END dataform_v1_dataform_releaseconfig_create]
