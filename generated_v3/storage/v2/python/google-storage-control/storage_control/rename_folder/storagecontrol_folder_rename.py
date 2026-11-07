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

# [START storage_v2_storagecontrol_rename_folder]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def rename_folder(
    project_id: str,
    bucket_id: str,
    folder_id: str,
    destination_folder_id: str,
) -> None:
    """Renames a folder in a Cloud Storage bucket.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        bucket_id: The ID of the bucket (for example, 'example-bucket-id').
        folder_id: The ID of the source folder (for example,
            'example-folder-id').
        destination_folder_id: The ID of the destination folder (for example,
            'example-destination-folder-id').
    """
    client = storage_control_v2.StorageControlClient()

    # Cloud Storage bucket names are globally unique; Storage Control requires
    # the literal '_' wildcard for the project identifier in bucket and folder paths.
    name = f"projects/_/buckets/{bucket_id}/folders/{folder_id}"

    request = storage_control_v2.RenameFolderRequest(
        name=name,
        destination_folder_id=destination_folder_id,
    )

    try:
        operation = client.rename_folder(request=request)
        response = operation.result()
        print(f"Renamed folder path: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API operation failed: {e}")


# [END storage_v2_storagecontrol_rename_folder]
