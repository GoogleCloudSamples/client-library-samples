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

# [START storage_v2_storagecontrol_managedfolder_get]
# [START storage_storagecontrol_managedfolder_get]
# [START storage_control_managed_folder_get]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def get_managed_folder(bucket_name: str, managed_folder_name: str) -> None:
    """Retrieves metadata for a specified managed folder.

    Args:
        bucket_name: The name of the bucket containing the managed folder.
        managed_folder_name: The full path of the managed folder to retrieve,
                             including trailing slash (e.g., "my-folder/sub-folder/")
    """
    client = storage_control_v2.StorageControlClient()

    # The storage bucket path uses the global access pattern,
    # in which the "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"

    managed_folder_path = client.managed_folder_path(
        project=GLOBAL_NAMESPACE_PATTERN,
        bucket=bucket_name,
        managed_folder=managed_folder_name,
    )

    try:
        managed_folder = client.get_managed_folder(name=managed_folder_path)

        print(f"Successfully retrieved managed folder: {managed_folder.name}")
        print(f"  Metageneration: {managed_folder.metageneration}")
        print(f"  Create Time: {managed_folder.create_time}")
        print(f"  Update Time: {managed_folder.update_time}")

    except google.api_core.exceptions.NotFound:
        print(f"Managed folder {managed_folder_path} not found.")
    except google.api_core.exceptions.PermissionDenied:
        print(
            f"Permission denied to access managed folder {managed_folder_path}. "
            "Please check your IAM permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_control_managed_folder_get]
# [END storage_storagecontrol_managedfolder_get]
# [END storage_v2_storagecontrol_managedfolder_get]
