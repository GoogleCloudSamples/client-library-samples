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

# [START dataform_v1beta1_dataform_teamfoldertree_delete]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1

client = dataform_v1beta1.DataformClient()


def delete_team_folder_tree(
    project_id: str, location_id: str, team_folder_id: str
) -> None:
    """Deletes a Dataform team folder tree and waits for the operation to complete.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        team_folder_id: The server-generated ID of the TeamFolder to delete (for example, 'example-teamfolder-id').
    """
    name = f"projects/{project_id}/locations/{location_id}/teamFolders/{team_folder_id}"

    try:
        operation = client.delete_team_folder_tree(name=name)
        operation.result()
        print(f"Deleted team folder tree: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Operation failed: {error}")
# [END dataform_v1beta1_dataform_teamfoldertree_delete]
