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

# [START redis_v1beta1_cloudredis_failover_instance]
import google.api_core.exceptions
from google.cloud import redis_v1beta1

client = redis_v1beta1.CloudRedisClient()


def failover_instance(project_id: str, location_id: str, instance_id: str) -> None:
    """Initiates a failover of the primary node to a replica for a Redis instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        instance_id: ID of the Cloud Memorystore for Redis instance (for example, 'example-instance').
    """
    name = f"projects/{project_id}/locations/{location_id}/instances/{instance_id}"
    data_protection_mode = (
        redis_v1beta1.FailoverInstanceRequest.DataProtectionMode.LIMITED_DATA_LOSS
    )

    try:
        request = redis_v1beta1.FailoverInstanceRequest(
            name=name,
            data_protection_mode=data_protection_mode,
        )
        operation = client.failover_instance(request=request)
        print("Waiting for failover operation to complete...")
        response = operation.result()
        print(f"Failover completed for instance: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failover operation failed: {e}")
# [END redis_v1beta1_cloudredis_failover_instance]
