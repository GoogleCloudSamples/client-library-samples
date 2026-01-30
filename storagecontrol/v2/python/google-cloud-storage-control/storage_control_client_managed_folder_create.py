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


# [START storage_v2_storagecontrol_managedfolder_create]
# [START storage_storagecontrol_managedfolder_create]
# [START storage_control_managed_folder_create]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def create_managed_folder(
    bucket_name: str,
    managed_folder_name: str,
) -> None:
    """
    Creates a new managed folder within a specified bucket.

    Args:
        bucket_name: The name of the bucket where the managed folder will be created.
        managed_folder_name: The ID of the managed folder to create.
    """
    client = storage_control_v2.StorageControlClient()

    GLOBAL_NAMESPACE_PATTERN = "_"
    parent_name = f"projects/{GLOBAL_NAMESPACE_PATTERN}/buckets/{bucket_name}"

    try:
        request = storage_control_v2.CreateManagedFolderRequest(
            parent=parent_name,
            managed_folder_id=managed_folder_name,
        )

        managed_folder = client.create_managed_folder(request=request)

        print(f"Successfully created managed folder: {managed_folder.name}")
        print(f"Metageneration: {managed_folder.metageneration}")
        print(f"Create Time: {managed_folder.create_time.isoformat()}")

    except google.api_core.exceptions.AlreadyExists as e:
        print(
            f"Error: Managed folder '{managed_folder_name}' already exists in bucket '{bucket_name}'."
        )
        print(e)
    except google.api_core.exceptions.NotFound as e:
        print(f"Error: The specified bucket '{bucket_name}' was not found.")
        print(e)
    except google.api_core.exceptions.PermissionDenied as e:
        print(
            f"Error: You do not have permission to create managed folders in bucket '{bucket_name}'."
        )
        print(e)
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"An unexpected API error occurred: {e}")


# [END storage_control_managed_folder_create]
# [END storage_storagecontrol_managedfolder_create]
# [END storage_v2_storagecontrol_managedfolder_create]
