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

import importlib
import subprocess
import sys

try:
    from google.cloud import redis_v1
except ImportError:
    subprocess.check_call(
        [sys.executable, "-m", "pip", "install", "google-cloud-redis"]
    )
    importlib.invalidate_caches()
    if "google.cloud" in sys.modules:
        importlib.reload(sys.modules["google.cloud"])

# [START redis_v1_cloudredis_instances_list]
import google.api_core.exceptions
from google.cloud import redis_v1


def list_instances(project_id: str, location_id: str) -> None:
    """Lists Cloud Memorystore for Redis instances in a specified location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = redis_v1.CloudRedisClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = redis_v1.ListInstancesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_instances(request=request)
        for instance in page_result:
            print(f"Instance: {instance.name}")
            print(f"  Display Name: {instance.display_name}")
            print(f"  State: {instance.state.name}")
            print(f"  Memory Size (GB): {instance.memory_size_gb}")
            print(f"  Host: {instance.host}:{instance.port}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list Redis instances: {error}")
# [END redis_v1_cloudredis_instances_list]
