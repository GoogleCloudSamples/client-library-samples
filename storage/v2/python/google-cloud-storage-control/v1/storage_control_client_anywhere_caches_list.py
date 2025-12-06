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

# [START storage_v2_storagecontrol_anywherecaches_list]
from google.api_core import exceptions
from google.cloud import storage_control_v2


def list_anywhere_caches(
    bucket_name: str,
) -> None:
    """
    Lists Anywhere Cache instances for a given bucket.

    Anywhere Caches are a feature of Cloud Storage that allows you to cache frequently
    accessed data closer to your compute resources, reducing latency and egress costs.
    This sample demonstrates how to retrieve a list of all Anywhere Cache instances
    associated with a specific Cloud Storage bucket.

    Args:
        bucket_name: The name of the bucket to list Anywhere Caches for.
    """
    client = storage_control_v2.StorageControlClient()

    # The storage bucket path uses the global access pattern,
    # in which the "_" denotes this bucket exists in the global namespace.
    GLOBAL_NAMESPACE_PATTERN = "_"
    parent = f"projects/{GLOBAL_NAMESPACE_PATTERN}/buckets/{bucket_name}"

    try:
        # This method returns an iterable (pager) that allows you to loop through
        # all results, even if they span multiple pages.
        anywhere_caches = client.list_anywhere_caches(parent=parent)

        found_caches = False
        print(f"Anywhere Caches for bucket '{bucket_name}':")
        for cache in anywhere_caches:
            found_caches = True
            print(f"  Name: {cache.name}")
            print(f"  Zone: {cache.zone}")
            print(f"  State: {cache.state}")
            print(f"  TTL: {cache.ttl.seconds} seconds")
            print(f"  Admission Policy: {cache.admission_policy}")
            print("----------------------------------------")

        if not found_caches:
            print("  No Anywhere Cache instances found for this bucket.")

    except exceptions.NotFound:
        print(f"Error: Bucket '{bucket_name}' not found.")
        print("Please ensure the bucket name is correct and the bucket exists.")
    except exceptions.PermissionDenied:
        print(
            f"Error: Permission denied to list Anywhere Caches for bucket '{bucket_name}'."
        )
        print(
            "Please ensure the authenticated service account has 'storage.anywhereCaches.list' permission."
        )
    except exceptions.GoogleAPIError as e:
        print(f"An unexpected API error occurred: {e}")
        print("Please check the error details and your project/bucket configuration.")


# [END storage_v2_storagecontrol_anywherecaches_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Anywhere Cache instances for a given bucket."
    )
    parser.add_argument(
        "--bucket_name",
        required=True,
        help="The name of the bucket to list Anywhere Caches for.",
    )

    args = parser.parse_args()
    list_anywhere_caches(args.bucket_name)
