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

# [START cloudtasks_v2beta3_cloudtasks_queue_create]
import google.api_core.exceptions
from google.cloud import tasks_v2beta3


def create_queue(project_id: str, location_id: str, queue_id: str) -> None:
    """Creates a Cloud Tasks queue.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The canonical ID of the location where the queue is created
          (for example, 'us-central1').
        queue_id: The ID of the queue to create. Can contain letters, numbers,
          and hyphens with a maximum length of 100 characters.
    """
    client = tasks_v2beta3.CloudTasksClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    queue = tasks_v2beta3.Queue(
        name=f"projects/{project_id}/locations/{location_id}/queues/{queue_id}"
    )

    try:
        response = client.create_queue(parent=parent, queue=queue)
        print(f"Created queue: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create queue: {error}")
# [END cloudtasks_v2beta3_cloudtasks_queue_create]
