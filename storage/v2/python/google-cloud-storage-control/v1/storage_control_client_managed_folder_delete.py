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

# [START storage_v2_storagecontrol_managedfolder_delete]
from google.api_core.exceptions import FailedPrecondition, NotFound
from google.cloud import storage_control_v2


def delete_managed_folder(bucket_name: str, managed_folder_name: str) -> None:
    """
    Deletes an empty managed folder in a Cloud Storage bucket.

    This operation permanently removes a managed folder. The managed folder must
    be empty (contain no objects or child managed folders) unless
    `allow_non_empty` is set to True (which requires additional permissions).

    Args:
        bucket_name: The name of the bucket containing the managed folder.
        managed_folder_name: The full path of the managed folder to delete,
                             including trailing slash (e.g., "my-folder/sub-folder/").
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

    request = storage_control_v2.DeleteManagedFolderRequest(
        name=managed_folder_path,
    )

    try:
        client.delete_managed_folder(request=request)
        print(f"Managed folder '{managed_folder_path}' deleted successfully.")
    except NotFound:
        print(f"Error: Managed folder '{managed_folder_path}' not found.")
    except FailedPrecondition as e:
        print(
            f"Error: Cannot delete managed folder '{managed_folder_path}'. "
            f"It might not be empty or a precondition failed: {e}"
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_v2_storagecontrol_managedfolder_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes an empty managed folder in a Cloud Storage bucket."
    )
    parser.add_argument(
        "--bucket_name",
        type=str,
        help="The name of the bucket containing the managed folder.",
    )
    parser.add_argument(
        "--managed_folder_name",
        type=str,
        help="The full path of the managed folder to delete, including trailing slash (e.g., 'my-folder/sub-folder/').",
    )

    args = parser.parse_args()

    delete_managed_folder(args.bucket_name, args.managed_folder_name)
