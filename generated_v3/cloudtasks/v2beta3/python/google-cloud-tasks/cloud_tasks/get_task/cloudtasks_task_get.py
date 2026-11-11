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

# [START cloudtasks_v2beta3_cloudtasks_task_get]
import google.api_core.exceptions
from google.cloud import tasks_v2beta3


def get_task(project_id: str, location_id: str, queue_id: str, task_id: str) -> None:
    """Retrieves an existing task from a Cloud Tasks queue.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Cloud Tasks queue resides (for example, 'us-central1').
        queue_id: The ID of the existing Cloud Tasks queue (for example, 'example-queue').
        task_id: The ID of the task to retrieve (for example, 'example-task-123').
    """
    client = tasks_v2beta3.CloudTasksClient()

    name = client.task_path(project_id, location_id, queue_id, task_id)

    try:
        response = client.get_task(name=name)
        print(f"Retrieved task: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END cloudtasks_v2beta3_cloudtasks_task_get]
