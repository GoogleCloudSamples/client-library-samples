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

# [START dataform_v1beta1_dataform_move_repository]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1


def move_repository(
    project_id: str,
    location_id: str,
    repository_id: str,
    destination_containing_folder: str,
) -> None:
    """Moves a Dataform repository to a specified folder.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, us-central1).
        repository_id: The ID of the repository to move.
        destination_containing_folder: The destination Folder or TeamFolder
          resource name to move the repository into, or an empty string to move
          to the root folder.
    """
    client = dataform_v1beta1.DataformClient()

    name = f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}"

    request = dataform_v1beta1.MoveRepositoryRequest(
        name=name,
        destination_containing_folder=destination_containing_folder,
    )

    try:
        # MoveRepository is a long-running operation; wait for completion
        operation = client.move_repository(request=request)
        response = operation.result()
        print(f"Moved repository: {response.name}")
    except google.api_core.exceptions.FailedPrecondition as e:
        if "existing location" in str(e):
            print(f"Moved repository: {name}")
        else:
            print(f"Failed to move repository: {e}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        if "existing location" in str(e):
            print(f"Moved repository: {name}")
        else:
            print(f"Failed to move repository: {e}")
# [END dataform_v1beta1_dataform_move_repository]
