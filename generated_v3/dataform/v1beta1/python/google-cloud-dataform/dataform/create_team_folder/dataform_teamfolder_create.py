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

# [START dataform_v1beta1_dataform_teamfolder_create]
import uuid

import google.api_core.exceptions
from google.cloud import dataform_v1beta1


def create_team_folder(project_id: str, location_id: str) -> None:
    """Creates a team folder in Dataform.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        location_id: The Google Cloud region where the service is located (for
            example, 'us-central1').
    """
    client = dataform_v1beta1.DataformClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    unique_suffix = uuid.uuid4().hex[:8]
    team_folder = dataform_v1beta1.TeamFolder(
        display_name=f"Example Team Folder {unique_suffix}",
    )

    try:
        response = client.create_team_folder(
            parent=parent,
            team_folder=team_folder,
        )
        print(f"Created team folder: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create team folder: {error}")
# [END dataform_v1beta1_dataform_teamfolder_create]
