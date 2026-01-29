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

# [START storage_v2_storagecontrol_managedfolder_delete]
# [START storage_storagecontrol_managedfolder_delete]
# [START storage_control_managed_folder_delete]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def delete_managed_folder(bucket_name: str, managed_folder_name: str) -> None:
    """
    Deletes an empty managed folder in a Cloud Storage bucket.

    Args:
        bucket_name: The name of the bucket containing the managed folder.
        managed_folder_name: The full path of the managed folder to delete.
    """
    client = storage_control_v2.StorageControlClient()

    GLOBAL_NAMESPACE_PATTERN = "_"

    managed_folder_path = client.managed_folder_path(
        project=GLOBAL_NAMESPACE_PATTERN,
        bucket=bucket_name,
        managed_folder=managed_folder_name,
    )

    request = storage_control_v2.DeleteManagedFolderRequest(
        name=managed_folder_path,
    )

    try:
        client.delete_managed_folder(request=request)
        print(f"Managed folder '{managed_folder_path}' deleted successfully.")
    except google.api_core.exceptions.NotFound:
        print(f"Error: Managed folder '{managed_folder_path}' not found.")
    except google.api_core.exceptions.FailedPrecondition as e:
        print(
            f"Error: Cannot delete managed folder '{managed_folder_path}'. "
            f"It might not be empty or a precondition failed: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_control_managed_folder_delete]
# [END storage_storagecontrol_managedfolder_delete]
# [END storage_v2_storagecontrol_managedfolder_delete]
