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

# [START cloud_tasks_get_task]
from google.api_core import exceptions
from google.cloud import tasks_v2


def get_task(project_id: str, location_id: str, queue_id: str, task_id: str) -> None:
    """Gets a task from a Cloud Tasks queue.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        queue_id: ID of the queue (for example, 'example-queue-id').
        task_id: ID of the task (for example, 'example-task-id').
    """
    client = tasks_v2.CloudTasksClient()

    name = client.task_path(project_id, location_id, queue_id, task_id)

    try:
        response = client.get_task(name=name)
        print(f"Retrieved task: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Error retrieving task: {error}")
# [END cloud_tasks_get_task]
