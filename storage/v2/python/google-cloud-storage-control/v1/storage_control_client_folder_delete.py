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

import argparse

# [START storage_v2_storagecontrol_folder_delete]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def delete_folder(
    bucket_name: str,
    folder_name: str,
) -> None:
    """
    Deletes a folder in a hierarchical namespace-enabled bucket.

    This method demonstrates how to delete a folder in a bucket where
    hierarchical namespaces are enabled. Folders must be empty to be deleted.

    Args:
        bucket_name: The name of the bucket containing the folder.
        folder_name: The full path of the folder to delete, e.g., 'my-folder/sub-folder/'.
                     Must end with a '/'.
    """
    client = storage_control_v2.StorageControlClient()

    # The storage bucket path uses the global access pattern,
    # in which the "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"
    folder_path = client.folder_path(
        project=GLOBAL_NAMESPACE_PATTERN, bucket=bucket_name, folder=folder_name
    )

    try:
        print(f"Attempting to delete folder: {folder_name}")
        # Act: Make the delete folder request.
        client.delete_folder(name=folder_path)

        # Assert: Print a success message.
        print(f"Successfully deleted folder: {folder_name}")
    except exceptions.NotFound:
        print(f"Error: Folder '{folder_name}' not found.")
        print(
            "Please ensure the folder path is correct and exists in the specified bucket."
        )
    except exceptions.FailedPrecondition as e:
        print(f"Error deleting folder '{folder_name}': {e}")
        print("Folders must be empty before they can be deleted.")
        print("Please ensure there are no objects or sub-folders within the folder.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_v2_storagecontrol_folder_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Delete a folder in a hierarchical namespace-enabled bucket."
    )
    parser.add_argument(
        "--bucket_name",
        required=True,
        help="The name of the bucket containing the folder.",
    )
    parser.add_argument(
        "--folder_name",
        required=True,
        help="The full name of the folder to delete, e.g., 'my-folder/sub-folder/'. Must end with a '/'.",
    )

    args = parser.parse_args()

    delete_folder(args.bucket_name, args.folder_name)
