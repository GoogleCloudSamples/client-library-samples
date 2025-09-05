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

# [START storage_v2_storagecontrol_folders_list]
from google.cloud import storage_control_v2
from google.api_core import exceptions

def list_folders_sample(
    bucket_name: str,
) -> None:
    """
    Lists folders within a hierarchical namespace enabled bucket.

    This method demonstrates how to retrieve a list of folders in a specified
    bucket. This operation is only applicable to buckets with hierarchical
    namespaces enabled.

    Args:
        project_id: The ID of the Google Cloud project.
        bucket_name: The name of the bucket to list folders from.
    """
    client = storage_control_v2.StorageControlClient()

    # The storage bucket path uses the global access pattern,
    # in which the "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"
    parent_path = f"projects/{GLOBAL_NAMESPACE_PATTERN}/buckets/{bucket_name}"

    try:
        request = storage_control_v2.ListFoldersRequest(
            parent=parent_path,
            # Optional: You can add a prefix to filter folders.
            # prefix="my-folder/",
            # Optional: You can set a page_size to control the number of results per page.
            # page_size=10,
        )

        page_result = client.list_folders(request=request)

        print(f"Folders in bucket '{bucket_name}':")
        found_folders = False
        for folder in page_result:
            found_folders = True
            print(f"  Folder Name: {folder.name}")
            print(f"  Metageneration: {folder.metageneration}")
            print(f"  Create Time: {folder.create_time}")
            print(f"  Update Time: {folder.update_time}")
            print("---")

        if not found_folders:
            print(f"No folders found in bucket '{bucket_name}'.")

    except exceptions.NotFound:
        print(
            f"Error: The bucket '{bucket_name}' was not found or does not have "
            "a hierarchical namespace enabled. Please ensure the bucket exists "
            "and is configured for hierarchical namespaces."
        )
    except exceptions.PermissionDenied:
        print(
            f"Error: Permission denied to list folders in bucket '{bucket_name}'. "
            "Please check your IAM permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END storage_v2_storagecontrol_folders_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists folders within a hierarchical namespace enabled bucket."
    )
    parser.add_argument(
        "--bucket_name",
        required=True,
        help="The name of the bucket to list folders from (e.g., 'my-hns-bucket').",
    )
    args = parser.parse_args()
    list_folders_sample(args.bucket_name)
