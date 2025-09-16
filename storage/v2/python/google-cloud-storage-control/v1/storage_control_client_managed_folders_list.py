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

# [START storage_v2_storagecontrol_managedfolders_list]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def list_managed_folders(bucket_name: str) -> None:
    """
    Lists managed folders within a given bucket.

    Managed folders in Cloud Storage provide a way to organize and apply policies
    to a subset of objects within a bucket, acting as a logical grouping mechanism.
    This sample demonstrates how to retrieve a paginated list of these managed folders.

    Args:
        bucket_name: The name of the bucket to list managed folders from.
    """
    client = storage_control_v2.StorageControlClient()

    # The storage bucket path uses the global access pattern,
    # in which the "_" denotes this bucket exists in the global namespace.
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

    except exceptions.NotFound:
        print(f"Error: Bucket '{bucket_name}' not found.")
        print(
            "Please ensure the bucket name and project ID are correct and the bucket exists."
        )
    except exceptions.PermissionDenied:
        print(
            "Error: Permission denied. Please ensure your account has the necessary permissions."
        )
        print(
            f"Required permissions: storage.managedFolders.list for bucket '{bucket_name}'."
        )
    except exceptions.GoogleAPIError as e:
        print(f"An unexpected API error occurred: {e}")


# [END storage_v2_storagecontrol_managedfolders_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List managed folders in a Google Cloud Storage bucket."
    )
    parser.add_argument(
        "--bucket_name",
        required=True,
        help="The name of the bucket to list managed folders from.",
    )

    args = parser.parse_args()

    list_managed_folders(args.bucket_name)
