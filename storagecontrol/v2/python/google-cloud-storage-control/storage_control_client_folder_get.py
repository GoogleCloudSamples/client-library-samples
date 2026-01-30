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

# [START storage_v2_storagecontrol_folder_get]
# [START storage_storagecontrol_folder_get]
# [START storage_control_get_folder]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def get_folder(
    bucket_name: str,
    folder_name: str,
) -> None:
    """Retrieves metadata for a specified folder.

    Args:
        bucket_name: The name of the bucket containing the folder.
        folder_name: The full path of the folder to retrieve,
                     including trailing slash (e.g., "my-folder/sub-folder/")
    """
    client = storage_control_v2.StorageControlClient()

    # The "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"
    folder_path = client.folder_path(
        project=GLOBAL_NAMESPACE_PATTERN, bucket=bucket_name, folder=folder_name
    )

    try:
        folder = client.get_folder(name=folder_path)

        print(f"Successfully retrieved folder: {folder.name}")
        print(f"Metageneration: {folder.metageneration}")
        print(f"Create Time: {folder.create_time.isoformat()}")
        print(f"Update Time: {folder.update_time.isoformat()}")

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: Folder '{folder_path}' not found. "
            "Please ensure the folder exists and the bucket is hierarchical namespace enabled."
        )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")


# [END storage_control_get_folder]
# [END storage_storagecontrol_folder_get]
# [END storage_v2_storagecontrol_folder_get]
