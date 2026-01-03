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

from google.api_core import exceptions

# [START storage_v2_storagecontrol_folder_get]
from google.cloud import storage_control_v2

def get_folder(
    bucket_name: str,
    folder_name: str,
) -> None:
    """
    Retrieves metadata for a specified folder.

    This sample demonstrates how to retrieve metadata for a folder within a
    hierarchical namespace enabled bucket. The operation fetches details such as
    metageneration, creation time, and update time of the folder.

    Args:
        bucket_name: The name of the bucket containing the folder.
        folder_name: The name of the folder to retrieve (e.g., 'my-folder/sub-folder/').
    """
    client = storage_control_v2.StorageControlClient()

    # The storage bucket path uses the global access pattern,
    # in which the "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"
    folder_path = client.folder_path(
            project=GLOBAL_NAMESPACE_PATTERN, bucket=bucket_name, folder=folder_name
        )

    try:
        folder = client.get_folder(name=folder_path)

        print(f"Successfully retrieved folder: {folder.name}")
        print(f"  Metageneration: {folder.metageneration}")
        print(f"  Create Time: {folder.create_time.isoformat()}")
        print(f"  Update Time: {folder.update_time.isoformat()}")

    except exceptions.NotFound:
        print(
            f"Error: Folder '{folder_path}' not found. "
            "Please ensure the folder exists and the bucket is hierarchical namespace enabled."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")

# [END storage_v2_storagecontrol_folder_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve metadata for a folder in a hierarchical namespace enabled bucket."
    )
    parser.add_argument(
        "--bucket_name",
        required=True,
        help="The name of the bucket containing the folder."
    )
    parser.add_argument(
        "--folder_name",
        required=True,
        help="The name of the folder to retrieve (e.g., 'my-folder/sub-folder/')."
    )

    args = parser.parse_args()

    get_folder(
        bucket_name=args.bucket_name,
        folder_name=args.folder_name,
    )
