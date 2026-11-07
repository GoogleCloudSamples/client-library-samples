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

# [START dataform_v1_dataform_query_folder_contents]
import google.api_core.exceptions
from google.cloud import dataform_v1


def query_folder_contents(project_id: str, location_id: str, folder_id: str) -> None:
    """Queries contents of a Dataform folder.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud region where the Dataform folder is located (for example, 'us-central1').
        folder_id: Server-generated ID of the Dataform folder (for example, 'example-folder-id').
    """
    client = dataform_v1.DataformClient()

    folder = f"projects/{project_id}/locations/{location_id}/folders/{folder_id}"

    request = dataform_v1.QueryFolderContentsRequest(
        folder=folder,
    )

    try:
        response = client.query_folder_contents(request=request)
        print(f"Queried folder contents for: {folder}")
        for item in response:
            print(f"Found folder content: {item}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error querying folder contents: {error.message}")
# [END dataform_v1_dataform_query_folder_contents]
