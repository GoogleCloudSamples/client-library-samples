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

# [START dataform_v1beta1_dataform_teamfolder_delete]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def delete_team_folder(project_id: str, location_id: str, team_folder_id: str) -> None:
    """Deletes a Dataform team folder.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the Dataform team folder.
        team_folder_id: The server-generated ID of the Dataform team folder to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/teamFolders/{team_folder_id}"

    try:
        client.delete_team_folder(name=name)
        print(f"Deleted team folder: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END dataform_v1beta1_dataform_teamfolder_delete]
