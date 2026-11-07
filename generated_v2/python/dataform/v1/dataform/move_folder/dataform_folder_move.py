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

# [START dataform_v1_dataform_move_folder]
import google.api_core.exceptions
from google.cloud import dataform_v1


def move_folder(
    project_id: str,
    location_id: str,
    folder_id: str,
    destination_containing_folder: str,
) -> None:
    """Moves a folder to another containing folder or the root directory.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, us-central1).
        folder_id: The ID of the folder to move.
        destination_containing_folder: The full resource name of the destination
            folder, or an empty string to move to the root user directory.
    """
    client = dataform_v1.DataformClient()

    name = f"projects/{project_id}/locations/{location_id}/folders/{folder_id}"

    request = dataform_v1.MoveFolderRequest(
        name=name,
        destination_containing_folder=destination_containing_folder,
    )

    try:
        operation = client.move_folder(request=request)
        # Override the expected result type to match the Folder message returned
        # by the backend rather than the Empty response specified in the proto.
        operation._result_type = dataform_v1.Folder
        response = operation.result()
        print(f"Moved folder: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to move folder: {exc}")
# [END dataform_v1_dataform_move_folder]
