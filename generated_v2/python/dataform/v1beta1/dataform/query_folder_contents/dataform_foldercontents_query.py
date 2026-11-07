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

# [START dataform_v1beta1_dataform_query_folder_contents]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1


def query_folder_contents(project_id: str, location_id: str, folder_id: str) -> None:
    """Queries contents of a Dataform folder.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        folder_id: The server-generated ID of the Dataform Folder (for example, '4f62e89d-7ab1-4773-8a9d-b4b0e917d891').
    """
    client = dataform_v1beta1.DataformClient()

    folder = f"projects/{project_id}/locations/{location_id}/folders/{folder_id}"

    request = dataform_v1beta1.QueryFolderContentsRequest(
        folder=folder,
    )

    try:
        response = client.query_folder_contents(request=request)
        print(f"Queried folder contents for: {folder}")
        has_contents = False
        for item in response:
            print(item)
            has_contents = True
        if not has_contents:
            print("Folder is empty.")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END dataform_v1beta1_dataform_query_folder_contents]
