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

# [START storage_v2_storagecontrol_anywherecache_get]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def get_anywhere_cache(
    bucket_name: str,
    anywhere_cache_id: str,
) -> None:
    """
    Retrieves the metadata for a specific Anywhere Cache instance.

    This method demonstrates how to fetch details about an existing Anywhere Cache
    instance within a given bucket, including its state, TTL, and admission policy.

    Args:
        bucket_name: The name of the bucket where the Anywhere Cache is located.
        anywhere_cache_id: The ID of the Anywhere Cache instance to retrieve.
                           Example: "my-anywhere-cache"
    """
    client = storage_control_v2.StorageControlClient()

    # The storage bucket path uses the global access pattern,
    # in which the "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"

    # Construct the full resource name of the Anywhere Cache.
    anywhere_cache_name = client.anywhere_cache_path(
        project=GLOBAL_NAMESPACE_PATTERN,
        bucket=bucket_name,
        anywhere_cache=anywhere_cache_id,
    )

    try:
        anywhere_cache = client.get_anywhere_cache(name=anywhere_cache_name)

        print(f"Successfully retrieved Anywhere Cache: {anywhere_cache.name}")
        print(f"  Zone: {anywhere_cache.zone}")
        print(f"  State: {anywhere_cache.state}")
        print(f"  TTL: {anywhere_cache.ttl.seconds} seconds")
        print(f"  Admission Policy: {anywhere_cache.admission_policy}")
        print(f"  Create Time: {anywhere_cache.create_time}")
        print(f"  Update Time: {anywhere_cache.update_time}")

    except exceptions.NotFound:
        print(
            f"Error: Anywhere Cache '{anywhere_cache_id}' not found in bucket "
            f"'{bucket_name}'."
            "Please ensure the Anywhere Cache ID and bucket name are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_v2_storagecontrol_anywherecache_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve metadata for a specific Anywhere Cache instance."
    )
    parser.add_argument(
        "--bucket_name",
        required=True,
        help="The name of the bucket where the Anywhere Cache is located.",
    )
    parser.add_argument(
        "--anywhere_cache_id",
        required=True,
        help="The ID of the Anywhere Cache instance to retrieve.",
    )

    args = parser.parse_args()

    get_anywhere_cache(
        bucket_name=args.bucket_name,
        anywhere_cache_id=args.anywhere_cache_id,
    )
