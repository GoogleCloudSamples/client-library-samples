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

# [START dataform_v1_dataform_teamfolders_search]
import google.api_core.exceptions
from google.cloud import dataform_v1


def search_team_folders(project_id: str, location_id: str) -> None:
    """Search Dataform team folders in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = dataform_v1.DataformClient()

    location = f"projects/{project_id}/locations/{location_id}"

    request = dataform_v1.SearchTeamFoldersRequest(
        location=location,
    )

    try:
        response = client.search_team_folders(request=request)
        for item in response:
            if hasattr(item, "team_folder"):
                folder = item.team_folder
            elif hasattr(item, "folder"):
                folder = item.folder
            else:
                folder = item

            if hasattr(folder, "name"):
                folder_name = folder.name
            elif hasattr(folder, "display_name"):
                folder_name = folder.display_name
            else:
                folder_name = folder

            print(f"Found team folder: {folder_name}")
    except google.api_core.exceptions.GoogleAPIError as exc:
        print(f"API request failed: {exc}")
# [END dataform_v1_dataform_teamfolders_search]
