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

# [START dataform_v1beta1_dataform_query_team_folder_contents]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1


def query_team_folder_contents(
    project_id: str, location_id: str, team_folder_id: str
) -> None:
    """Queries contents of a Dataform team folder.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        team_folder_id: The server-generated TeamFolder ID (for example, '4f3a2b1c').
    """
    client = dataform_v1beta1.DataformClient()

    team_folder = (
        f"projects/{project_id}/locations/{location_id}/teamFolders/{team_folder_id}"
    )

    request = dataform_v1beta1.QueryTeamFolderContentsRequest(
        team_folder=team_folder,
    )

    try:
        response = client.query_team_folder_contents(request=request)
        print(f"Queried contents for team folder: {team_folder}")
        count = 0
        for content in response:
            count += 1
            print(f"Folder content: {content}")
        if count == 0:
            print("No contents found in the team folder.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to query team folder contents: {e}")
# [END dataform_v1beta1_dataform_query_team_folder_contents]
