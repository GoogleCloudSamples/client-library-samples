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

# [START cloudtasks_v2beta2_cloudtasks_queue_create]
import google.api_core.exceptions
from google.cloud import tasks_v2beta2


def create_queue(project_id: str, location_id: str, queue_id: str) -> None:
    """Create a Cloud Tasks queue using the create_queue method.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1').
        queue_id: Caller-chosen identifier of the queue to create (for example,
            'example-queue'). Must contain only letters, numbers, or hyphens, up
            to 100 characters.
    """
    client = tasks_v2beta2.CloudTasksClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    queue = tasks_v2beta2.Queue(
        name=f"{parent}/queues/{queue_id}",
        pull_target=tasks_v2beta2.PullTarget(),
    )

    try:
        response = client.create_queue(parent=parent, queue=queue)
        print(f"Created queue: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create queue: {error}")
# [END cloudtasks_v2beta2_cloudtasks_queue_create]
