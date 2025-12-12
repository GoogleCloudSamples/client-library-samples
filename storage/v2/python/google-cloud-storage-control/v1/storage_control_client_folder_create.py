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

# [START storage_v2_storagecontrol_folder_create]
from google.cloud import storage_control_v2
from google.api_core import exceptions

def create_folder(
    bucket_name: str,
    folder_name: str,
) -> None:
    """
    Creates a new folder within a hierarchical namespace (HNS) enabled bucket.

    This operation is only applicable to buckets with the hierarchical namespace
    feature enabled. The folder_id must end with a slash.

    Args:
        bucket_name: The name of the bucket where the folder will be created.
                     This bucket must have hierarchical namespace enabled.
        folder_name: The full name of the folder to create, including all its
                   parent folders. Must end with a slash (e.g., 'my-folder/').
    """
    client = storage_control_v2.StorageControlClient()

    # The storage bucket path uses the global access pattern,
    # in which the "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"
    parent_path = f"projects/{GLOBAL_NAMESPACE_PATTERN}/buckets/{bucket_name}"

    # Create an empty Folder object as required by the API
    # The actual folder name is passed via folder_id in the request.
    folder_resource = storage_control_v2.Folder()

    try:
        # Make the request to create the folder
        folder = client.create_folder(
            parent=parent_path,
            folder=folder_resource,
            folder_id=folder_name,
        )

        print(f"Successfully created folder: {folder.name}")
        print(f"Metageneration: {folder.metageneration}")
        # The create_time is a google.protobuf.timestamp_pb2.Timestamp object
        # Convert it to ISO format for clear output.
        print(f"Create Time: {folder.create_time.isoformat()}")

    except exceptions.AlreadyExists as e:
        print(f"Error: Folder '{folder_name}' already exists in bucket '{bucket_name}'.")
        print(f"Please choose a unique folder_id or verify the folder does not exist.")
        print(f"Details: {e}")
    except exceptions.NotFound as e:
        print(
            f"Error: Bucket '{bucket_name}' not found or does not have hierarchical "
            f"namespace enabled. Please ensure the bucket exists and HNS is enabled."
        )
        print(f"Details: {e}")
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided for folder creation.")
        print(f"Please ensure 'folder_id' is correctly formatted and ends with a '/'.")
        print(f"Details: {e}")
    except exceptions.PermissionDenied as e:
        print(f"Error: Permission denied to create folder '{folder_name}' in bucket '{bucket_name}'.")
        print(f"Please ensure your service account has the necessary permissions (e.g., storage.folders.create).")
        print(f"Details: {e}")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e.message}")
        print(f"Error code: {e.code}")
        print(f"Please check the error details and API documentation for guidance.")

# [END storage_v2_storagecontrol_folder_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a folder in a hierarchical namespace enabled bucket."
    )
    parser.add_argument(
        "--bucket_name",
        required=True,
        help="The name of the bucket where the folder will be created. "
             "This bucket must have hierarchical namespace enabled.",
    )
    parser.add_argument(
        "--folder_name",
        required=True,
        help="The full name of the folder to create, including all its parent folders. "
             "Must end with a slash (e.g., 'my-new-folder/').",
    )

    args = parser.parse_args()

    create_folder(
        bucket_name=args.bucket_name,
        folder_name=args.folder_name,
    )
