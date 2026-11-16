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

# [START redis_v1beta1_cloudredis_reschedule_maintenance]
import google.api_core.exceptions
from google.cloud import redis_v1beta1


def reschedule_maintenance(
    project_id: str, location_id: str, instance_id: str
) -> None:
    """Reschedules maintenance for a Cloud Redis instance.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the instance is located (for
          example, 'us-central1').
        instance_id: The ID of the Cloud Redis instance (for example,
          'example-instance-id').
    """
    client = redis_v1beta1.CloudRedisClient()

    name = client.instance_path(project_id, location_id, instance_id)
    reschedule_type = (
        redis_v1beta1.RescheduleMaintenanceRequest.RescheduleType.IMMEDIATE
    )

    request = redis_v1beta1.RescheduleMaintenanceRequest(
        name=name,
        reschedule_type=reschedule_type,
    )

    try:
        operation = client.reschedule_maintenance(request=request)
        response = operation.result()
        print(f"Rescheduled maintenance for instance: {response.name}")
    except google.api_core.exceptions.FailedPrecondition:
        print(f"No upcoming maintenance scheduled for instance: {name}")
# [END redis_v1beta1_cloudredis_reschedule_maintenance]
