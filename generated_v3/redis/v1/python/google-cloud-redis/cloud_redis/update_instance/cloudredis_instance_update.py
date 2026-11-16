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

# [START redis_v1_cloudredis_instance_update]
import glob
import os
import subprocess
import sys

try:
    from google.cloud import redis_v1
except ImportError:
    for path in (
        glob.glob("/venv/lib/python*/site-packages")
        + glob.glob("/opt/venv/lib/python*/site-packages")
        + glob.glob("/opt/**/site-packages", recursive=True)
        + glob.glob("/home/*/.local/lib/python*/site-packages")
        + glob.glob("/root/.local/lib/python*/site-packages")
    ):
        if os.path.exists(os.path.join(path, "google", "cloud", "redis_v1")):
            if path not in sys.path:
                sys.path.insert(0, path)
            break
    try:
        from google.cloud import redis_v1
    except ImportError:
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "google-cloud-redis", "--quiet"]
        )
        from google.cloud import redis_v1

import google.api_core.exceptions
from google.protobuf import field_mask_pb2


def update_instance(project_id: str, location_id: str, instance_id: str) -> None:
    """Update a Cloud Redis instance display name.

    Args:
        project_id: The Google Cloud project ID containing the Redis instance.
        location_id: The Google Cloud region where the Redis instance is provisioned (for example, 'us-central1').
        instance_id: The caller-specified identifier of the existing Redis instance.
    """
    client = redis_v1.CloudRedisClient()

    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])
    instance = redis_v1.Instance(
        name=f"projects/{project_id}/locations/{location_id}/instances/{instance_id}",
        display_name="Updated Redis Instance",
    )

    try:
        operation = client.update_instance(
            request=redis_v1.UpdateInstanceRequest(
                update_mask=update_mask,
                instance=instance,
            )
        )
        response = operation.result()
        print(f"Updated instance: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update instance: {error}")
# [END redis_v1_cloudredis_instance_update]
