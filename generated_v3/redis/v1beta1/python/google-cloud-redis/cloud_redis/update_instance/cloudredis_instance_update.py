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

# [START redis_v1beta1_cloudredis_instance_update]
import google.api_core.exceptions
from google.cloud import redis_v1beta1
from google.protobuf import field_mask_pb2

client = redis_v1beta1.CloudRedisClient()


def update_instance(project_id: str, location_id: str, instance_id: str) -> None:
    """Updates the display name of a Cloud Redis instance.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The GCP region for the Redis instance (for example, 'us-central1').
        instance_id: The identifier of the existing Redis instance.
    """
    instance_name = (
        f"projects/{project_id}/locations/{location_id}/instances/{instance_id}"
    )
    instance = redis_v1beta1.Instance(
        name=instance_name,
        display_name="Updated Redis Instance",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        operation = client.update_instance(
            instance=instance,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated instance: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update instance: {error}")
# [END redis_v1beta1_cloudredis_instance_update]
