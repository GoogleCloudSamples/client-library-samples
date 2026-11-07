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

# [START storage_v2_storagecontrol_folder_get]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def get_folder(project_id: str, bucket_id: str, folder_id: str) -> None:
    """Retrieves metadata for a folder in a Cloud Storage bucket.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        bucket_id: The ID of the storage bucket (for example, 'example-bucket-id').
        folder_id: The ID of the folder (for example, 'example-folder-id').
    """
    client = storage_control_v2.StorageControlClient()

    # Cloud Storage Control API requires '_' wildcard as the project identifier.
    name = f"projects/_/buckets/{bucket_id}/folders/{folder_id}"

    request = storage_control_v2.GetFolderRequest(
        name=name,
    )

    try:
        response = client.get_folder(request=request)
        print(f"Retrieved folder: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END storage_v2_storagecontrol_folder_get]
