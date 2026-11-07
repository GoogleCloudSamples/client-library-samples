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

# [START dataform_v1_dataform_query_team_folder_contents]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def query_team_folder_contents(
    project_id: str, location_id: str, team_folder_id: str
) -> None:
    """Use the query_team_folder_contents method.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location of the TeamFolder (for example,
            'us-central1').
        team_folder_id: The server-generated ID of the TeamFolder (for example,
            'example-team-folder').
    """
    team_folder = (
        f"projects/{project_id}/locations/{location_id}"
        f"/teamFolders/{team_folder_id}"
    )

    request = dataform_v1.QueryTeamFolderContentsRequest(
        team_folder=team_folder,
    )

    try:
        response = client.query_team_folder_contents(request=request)
        print(f"Queried contents of team folder: {team_folder}")
        has_contents = False
        for entry in response:
            has_contents = True
            if entry.repository.name:
                print(f"Repository: {entry.repository.name}")
            elif entry.team_folder.name:
                print(f"Team folder: {entry.team_folder.name}")
        if not has_contents:
            print("No contents found in the team folder.")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END dataform_v1_dataform_query_team_folder_contents]
