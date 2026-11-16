# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START redis_v1_cloudredis_instanceauthstring_get]
import google.api_core.exceptions

try:
    from google.cloud import redis_v1
except ImportError:
    import importlib
    import subprocess
    import sys

    subprocess.check_call(
        [sys.executable, "-m", "pip", "install", "--quiet", "google-cloud-redis"]
    )
    importlib.invalidate_caches()
    from google.cloud import redis_v1


def get_instance_auth_string(
    project_id: str, location_id: str, instance_id: str
) -> None:
    """Gets the AUTH string for a Redis instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Redis instance is located (for example, 'us-central1').
        instance_id: The caller-assigned identifier of the Redis instance (for example, 'example-instance').
    """
    client = redis_v1.CloudRedisClient()
    name = f"projects/{project_id}/locations/{location_id}/instances/{instance_id}"

    try:
        response = client.get_instance_auth_string(name=name)
        print(f"AUTH string: {response.auth_string}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve AUTH string: {e}")
# [END redis_v1_cloudredis_instanceauthstring_get]
