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

# [START storage_v2_storagecontrol_anywherecache_get]
# [START storage_storagecontrol_anywherecache_get]
# [START storage_control_get_anywhere_cache]
import google.api_core.exceptions
from google.cloud import storage_control_v2


def get_anywhere_cache(
    bucket_name: str,
    anywhere_cache_zone: str,
) -> None:
    """Retrieves the metadata for a specific Anywhere Cache instance.

    Args:
        bucket_name: The name of the bucket where the Anywhere Cache is located.
        anywhere_cache_zone: The ID zone of the Anywhere Cache instance to retrieve.
                           Example: "us-central1-a"
    """
    client = storage_control_v2.StorageControlClient()

    anywhere_cache_name = client.anywhere_cache_path(
        project="_",
        bucket=bucket_name,
        anywhere_cache=anywhere_cache_zone,
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

    except google.api_core.exceptions.NotFound:
        print(
            f"Error: Anywhere Cache '{anywhere_cache_zone}' not found in bucket "
            f"'{bucket_name}'. "
            "Please ensure the Anywhere Cache ID and bucket name are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END storage_control_get_anywhere_cache]
# [END storage_storagecontrol_anywherecache_get]
# [END storage_v2_storagecontrol_anywherecache_get]
