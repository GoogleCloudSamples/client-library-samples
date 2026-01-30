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

# [START storage_v2_storagecontrol_folder_delete]
# [START storage_storagecontrol_folder_delete]
# [START storage_control_delete_folder]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def delete_folder(
    bucket_name: str,
    folder_name: str,
) -> None:
    """Deletes a folder in a hierarchical namespace-enabled bucket.

    Args:
        bucket_name: The name of the bucket containing the folder.
        folder_name: The full path of the folder to delete,
                     including trailing slash (e.g., "my-folder/sub-folder/")
    """
    client = storage_control_v2.StorageControlClient()

    # The "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"
    folder_path = client.folder_path(
        project=GLOBAL_NAMESPACE_PATTERN, bucket=bucket_name, folder=folder_name
    )

    try:
        print(f"Attempting to delete folder: {folder_name}")
        client.delete_folder(name=folder_path)

        print(f"Successfully deleted folder: {folder_name}")
    except google.api_core.exceptions.NotFound:
        print(f"Error: Folder '{folder_name}' not found.")
        print(
            "Please ensure the folder path is correct and exists in the specified bucket."
        )
    except google.api_core.exceptions.FailedPrecondition as e:
        print(f"Error deleting folder '{folder_name}': {e}")
        print("Folders must be empty before they can be deleted.")
        print("Please ensure there are no objects or sub-folders within the folder.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_control_delete_folder]
# [END storage_storagecontrol_folder_delete]
# [END storage_v2_storagecontrol_folder_delete]
