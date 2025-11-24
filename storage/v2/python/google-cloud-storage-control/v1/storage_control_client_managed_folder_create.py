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

# [START storage_v2_storagecontrol_managedfolder_create]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def create_managed_folder(
    bucket_name: str,
    managed_folder_name: str,
) -> None:
    """
    Creates a new managed folder within a specified bucket.

    Managed folders provide a way to organize and manage objects within a Google Cloud Storage
    bucket, offering a flat namespace for objects while allowing for hierarchical organization
    for management purposes, such as applying IAM policies.

    Args:
        bucket_name: The name of the bucket where the managed folder will be created.
        managed_folder_id: The ID of the managed folder to create (e.g., 'my-managed-folder/').
                           It must end with a slash.
    """
    client = storage_control_v2.StorageControlClient()

    # The storage bucket path uses the global access pattern,
    # in which the "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"
    parent_name = f"projects/{GLOBAL_NAMESPACE_PATTERN}/buckets/{bucket_name}"

    try:
        # Construct the request object.
        request = storage_control_v2.CreateManagedFolderRequest(
            parent=parent_name,
            managed_folder_id=managed_folder_name,
        )

        # Make the API call.
        managed_folder = client.create_managed_folder(request=request)

        print(f"Successfully created managed folder: {managed_folder.name}")
        print(f"Metageneration: {managed_folder.metageneration}")
        print(f"Create Time: {managed_folder.create_time.isoformat()}")

    except exceptions.AlreadyExists as e:
        print(
            f"Error: Managed folder '{managed_folder_name}' already exists in bucket '{bucket_name}'."
        )
        print(e)
    except exceptions.NotFound as e:
        print(f"Error: The specified bucket '{bucket_name}' was not found.")
        print(e)
    except exceptions.PermissionDenied as e:
        print(
            f"Error: You do not have permission to create managed folders in bucket '{bucket_name}'."
        )
        print(e)
    except exceptions.GoogleAPICallError as e:
        print(f"An unexpected API error occurred: {e}")


# [END storage_v2_storagecontrol_managedfolder_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a new managed folder in a Google Cloud Storage bucket."
    )
    parser.add_argument(
        "--bucket_name",
        type=str,
        required=True,
        help="The name of the bucket where the managed folder will be created.",
    )
    parser.add_argument(
        "--managed_folder_name",
        type=str,
        required=True,
        help="The name of the managed folder to create (e.g., 'my-managed-folder')",
    )

    args = parser.parse_args()

    create_managed_folder(
        bucket_name=args.bucket_name,
        managed_folder_name=args.managed_folder_name,
    )
