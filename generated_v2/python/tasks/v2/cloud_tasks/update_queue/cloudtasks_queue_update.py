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

# [START cloudtasks_v2_cloudtasks_queue_update]
import google.api_core.exceptions
from google.cloud import tasks_v2
from google.protobuf import field_mask_pb2


def update_queue(project_id: str, location_id: str, queue_id: str) -> None:
    """Update an existing Cloud Tasks queue configuration.

    Args:
        project_id: The Google Cloud project ID harboring the existing queue.
        location_id: The canonical location ID where the queue is hosted (for example, 'us-central1').
        queue_id: The ID of the queue to update.
    """
    client = tasks_v2.CloudTasksClient()

    queue_name = client.queue_path(project_id, location_id, queue_id)

    queue = tasks_v2.Queue(
        name=queue_name,
        rate_limits=tasks_v2.RateLimits(
            max_dispatches_per_second=20.0,
        ),
    )
    update_mask = field_mask_pb2.FieldMask(
        paths=["rate_limits.max_dispatches_per_second"]
    )

    try:
        response = client.update_queue(queue=queue, update_mask=update_mask)
        print(f"Updated queue: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update queue: {error}")
# [END cloudtasks_v2_cloudtasks_queue_update]
