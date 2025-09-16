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

# [START storage_v2_storagecontrol_storagelayout_get]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def get_storage_layout(bucket_name: str) -> None:
    """
    Retrieves the storage layout configuration for a given bucket.

    The StorageLayout resource provides information about how data is physically
    organized within a bucket, including its location, location type, custom
    placement configuration, and hierarchical namespace status.

    Args:
        bucket_name: The name of the bucket to retrieve the storage layout for.
    """
    client = storage_control_v2.StorageControlClient()

    # The storage bucket path uses the global access pattern,
    # in which the "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"
    # The name of the StorageLayout resource is in the format:
    # projects/{project}/buckets/{bucket}/storageLayout
    storage_layout_name = client.storage_layout_path(
        project=GLOBAL_NAMESPACE_PATTERN, bucket=bucket_name
    )
    try:
        request = storage_control_v2.GetStorageLayoutRequest(
            name=storage_layout_name,
        )

        response = client.get_storage_layout(request=request)

        print(f"Successfully retrieved StorageLayout for bucket: {bucket_name}")
        print(f"StorageLayout Name: {response.name}")
        print(f"Location: {response.location}")
        print(f"Location Type: {response.location_type}")

        if response.hierarchical_namespace:
            print(
                f"Hierarchical Namespace Enabled: {response.hierarchical_namespace.enabled}"
            )
        else:
            print("Hierarchical Namespace: Not configured (likely disabled)")

        if response.custom_placement_config:
            print("Custom Placement Config:")
            for loc in response.custom_placement_config.data_locations:
                print(f"  - Data Location: {loc}")

    except exceptions.NotFound:
        print(
            f"Error: StorageLayout for bucket '{bucket_name}' not found. "
            "Please ensure the bucket exists and you have the necessary permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_v2_storagecontrol_storagelayout_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve the storage layout configuration for a Google Cloud Storage bucket."
    )
    parser.add_argument(
        "--bucket_name",
        type=str,
        required=True,
        help="The name of the bucket to retrieve the storage layout for.",
    )

    args = parser.parse_args()

    get_storage_layout(bucket_name=args.bucket_name)
