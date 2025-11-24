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

# [START storage_v2_storagecontrol_managedfolder_get]
from google.api_core import exceptions as core_exceptions
from google.cloud import storage_control_v2


def get_managed_folder(bucket_name: str, managed_folder_name: str) -> None:
    """Retrieves metadata for a specified managed folder.

    Args:
        bucket_name: The name of the bucket containing the managed folder.
        managed_folder_name: The name of the managed folder to retrieve. Example: 'my-managed-folder/'.
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

    except core_exceptions.NotFound:
        print(f"Managed folder {managed_folder_path} not found.")
    except core_exceptions.PermissionDenied:
        print(
            f"Permission denied to access managed folder {managed_folder_path}. "
            "Please check your IAM permissions."
        )
    except Exception as e:
        # Catch any other unexpected errors during the API call.
        # This could include network issues, invalid arguments not caught by client-side validation,
        # or other service-side errors. Developers should consider specific error types
        # relevant to their application and handle them accordingly.
        print(f"An unexpected error occurred: {e}")


# [END storage_v2_storagecontrol_managedfolder_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve metadata for a Google Cloud Storage managed folder."
    )
    parser.add_argument(
        "--bucket_name",
        required=True,
        help="The name of the bucket containing the managed folder.",
    )
    parser.add_argument(
        "--managed_folder_name",
        required=True,
        help="The name of the managed folder to retrieve (e.g., 'my-folder/').",
    )

    args = parser.parse_args()

    get_managed_folder(
        bucket_name=args.bucket_name,
        managed_folder_name=args.managed_folder_name,
    )
