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

# [START cloudtasks_v2_cloudtasks_queue_create]
import google.api_core.exceptions
from google.cloud import tasks_v2


def create_queue(project_id: str, location_id: str, queue_id: str) -> None:
    """Creates a Cloud Tasks queue in a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The canonical ID for the queue location (for example, 'us-central1').
        queue_id: The caller-specified ID of the queue to create.
    """
    client = tasks_v2.CloudTasksClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    queue = tasks_v2.Queue(
        name=f"projects/{project_id}/locations/{location_id}/queues/{queue_id}"
    )

    try:
        response = client.create_queue(
            request={
                "parent": parent,
                "queue": queue,
            }
        )
        print(f"Created queue: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create queue: {error}")
# [END cloudtasks_v2_cloudtasks_queue_create]
