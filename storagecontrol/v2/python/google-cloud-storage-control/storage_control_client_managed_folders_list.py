# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


# [START storage_v2_storagecontrol_managedfolders_list]
# [START storage_storagecontrol_managedfolders_list]
# [START storage_control_managed_folder_list]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def list_managed_folders(bucket_name: str) -> None:
    """Lists managed folders within a given bucket.

    Args:
        bucket_name: The name of the bucket to list managed folders from.
    """
    client = storage_control_v2.StorageControlClient()

    GLOBAL_NAMESPACE_PATTERN = "_"
    parent = f"projects/{GLOBAL_NAMESPACE_PATTERN}/buckets/{bucket_name}"

    try:
        print(f"Listing managed folders in bucket: {bucket_name}")
        for managed_folder in client.list_managed_folders(parent=parent):
            print(f"  Managed Folder Name: {managed_folder.name}")
            print(f"  Metageneration: {managed_folder.metageneration}")
            print(f"  Create Time: {managed_folder.create_time.isoformat()}")
            print(f"  Update Time: {managed_folder.update_time.isoformat()}")
            print("----------------------------------------")

    except google.api_core.exceptions.NotFound:
        print(f"Error: Bucket '{bucket_name}' not found.")
        print(
            "Please ensure the bucket name and project ID are correct and the bucket exists."
        )
    except google.api_core.exceptions.PermissionDenied:
        print(
            "Error: Permission denied. Please ensure your account has the necessary permissions."
        )
        print(
            f"Required permissions: storage.managedFolders.list for bucket '{bucket_name}'."
        )
    except google.api_core.exceptions.GoogleAPIError as e:
        print(f"An unexpected API error occurred: {e}")


# [END storage_control_managed_folder_list]
# [END storage_storagecontrol_managedfolders_list]
# [END storage_v2_storagecontrol_managedfolders_list]
