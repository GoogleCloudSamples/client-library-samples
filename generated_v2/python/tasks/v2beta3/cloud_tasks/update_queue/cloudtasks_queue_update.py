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

# [START cloudtasks_v2beta3_cloudtasks_queue_update]
import google.api_core.exceptions
from google.cloud import tasks_v2beta3
from google.protobuf import field_mask_pb2


def update_queue(project_id: str, location_id: str, queue_id: str) -> None:
    """Updates a Cloud Tasks queue configuration.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the queue is located (for example, us-central1).
        queue_id: The ID of the queue to update.
    """
    client = tasks_v2beta3.CloudTasksClient()

    queue_name = client.queue_path(project_id, location_id, queue_id)
    queue = tasks_v2beta3.Queue(
        name=queue_name,
        rate_limits=tasks_v2beta3.RateLimits(
            max_dispatches_per_second=5.0
        ),
    )
    update_mask = field_mask_pb2.FieldMask(
        paths=["rate_limits.max_dispatches_per_second"]
    )

    try:
        response = client.update_queue(queue=queue, update_mask=update_mask)
        print(f"Updated queue: {response.name}")
        print(
            f"Max dispatches per second: {response.rate_limits.max_dispatches_per_second}"
        )
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudtasks_v2beta3_cloudtasks_queue_update]
