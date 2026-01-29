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

# [START storage_v2_storagecontrol_folder_create]
# [START storage_storagecontrol_folder_create]
# [START storage_control_create_folder]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def create_folder(
    bucket_name: str,
    folder_name: str,
) -> None:
    """Creates a new folder within a hierarchical namespace (HNS) enabled bucket.

    Args:
        bucket_name: The name of the bucket where the folder will be created.
                     This bucket must have hierarchical namespace enabled.
        folder_name: The full path of the folder to create,
                     including trailing slash (e.g., "my-folder/sub-folder/")
    """
    client = storage_control_v2.StorageControlClient()

    # The "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"
    parent_path = f"projects/{GLOBAL_NAMESPACE_PATTERN}/buckets/{bucket_name}"

    # Create an empty Folder object as required by the API
    folder_resource = storage_control_v2.Folder()

    try:
        folder = client.create_folder(
            parent=parent_path,
            folder=folder_resource,
            folder_id=folder_name,
        )

        print(f"Successfully created folder: {folder.name}")
        print(f"Metageneration: {folder.metageneration}")
        print(f"Create Time: {folder.create_time.isoformat()}")

    except google.api_core.exceptions.AlreadyExists as e:
        print(
            f"Error: Folder '{folder_name}' already exists in bucket '{bucket_name}'."
        )
        print("Please choose a unique folder_id or verify the folder does not exist.")
        print(f"Details: {e}")
    except google.api_core.exceptions.NotFound as e:
        print(
            f"Error: Bucket '{bucket_name}' not found or does not have hierarchical "
            f"namespace enabled. Please ensure the bucket exists and HNS is enabled."
        )
        print(f"Details: {e}")
    except google.api_core.exceptions.InvalidArgument as e:
        print("Error: Invalid argument provided for folder creation.")
        print("Please ensure 'folder_id' is correctly formatted and ends with a '/'.")
        print(f"Details: {e}")
    except google.api_core.exceptions.PermissionDenied as e:
        print(
            f"Error: Permission denied to create folder '{folder_name}' in bucket '{bucket_name}'."
        )
        print(
            "Please ensure your service account has the necessary"
            " permissions (e.g., storage.folders.create)."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_control_create_folder]
# [END storage_storagecontrol_folder_create]
# [END storage_v2_storagecontrol_folder_create]
