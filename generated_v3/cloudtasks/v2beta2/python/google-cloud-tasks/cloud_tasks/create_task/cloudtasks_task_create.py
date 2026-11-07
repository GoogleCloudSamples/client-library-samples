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

# [START cloudtasks_v2beta2_cloudtasks_task_create]
import google.api_core.exceptions
from google.cloud import tasks_v2beta2


def create_task(
    project_id: str,
    location_id: str,
    queue_id: str,
    response_id: str,
    schedule_time_id: str,
    already_exists_id: str,
    create_task_id: str,
) -> None:
    """Create a task in a Cloud Tasks queue.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the queue is located (for example, 'us-central1').
        queue_id: The queue identifier (for example, 'example-queue-id').
        response_id: The response identifier (for example, 'example-response-id').
        schedule_time_id: The schedule time identifier (for example, 'example-scheduletime-id').
        already_exists_id: The identifier used to track duplicate tasks (for example, 'example-alreadyexists-id').
        create_task_id: The task identifier to create (for example, 'example-createtask-id').
    """
    client = tasks_v2beta2.CloudTasksClient()
    parent = client.queue_path(project_id, location_id, queue_id)
    name = client.task_path(project_id, location_id, queue_id, create_task_id)
    task = tasks_v2beta2.Task(
        name=name,
        http_request=tasks_v2beta2.HttpRequest(
            http_method=tasks_v2beta2.HttpMethod.POST,
            url=f"https://example.com/tasks/{response_id}",
            headers={
                "X-Schedule-Time-Id": schedule_time_id,
                "X-Already-Exists-Id": already_exists_id,
            },
            body=b"Hello Cloud Tasks",
        ),
    )

    try:
        response = client.create_task(parent=parent, task=task)
        print(f"Created task: {response.name}")
    except google.api_core.exceptions.AlreadyExists:
        print(f"Task already exists: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create task: {e}")
# [END cloudtasks_v2beta2_cloudtasks_task_create]
