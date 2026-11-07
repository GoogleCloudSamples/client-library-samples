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

# [START cloudtasks_v2beta3_cloudtasks_tasks_batchcreate]
import google.api_core.exceptions
from google.cloud import tasks_v2beta3


def batch_create_tasks(project_id: str, location_id: str, queue_id: str) -> None:
    """Creates multiple tasks in a single batch request.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the queue is located (for example, 'us-central1').
        queue_id: The queue ID (for example, 'example-queue-id').
    """
    client = tasks_v2beta3.CloudTasksClient()
    parent = client.queue_path(project_id, location_id, queue_id)
    requests = [
        tasks_v2beta3.CreateTaskRequest(
            parent=parent,
            task=tasks_v2beta3.Task(
                http_request=tasks_v2beta3.HttpRequest(
                    http_method=tasks_v2beta3.HttpMethod.POST,
                    url="https://example.com/taskhandler",
                    body=b"Batch task payload 1",
                )
            ),
        ),
        tasks_v2beta3.CreateTaskRequest(
            parent=parent,
            task=tasks_v2beta3.Task(
                http_request=tasks_v2beta3.HttpRequest(
                    http_method=tasks_v2beta3.HttpMethod.POST,
                    url="https://example.com/taskhandler",
                    body=b"Batch task payload 2",
                )
            ),
        ),
    ]

    try:
        operation = client.batch_create_tasks(parent=parent, requests=requests)
        response = operation.result()
        for task in response.tasks:
            print(f"Created task: {task.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to batch create tasks: {e}")
# [END cloudtasks_v2beta3_cloudtasks_tasks_batchcreate]
