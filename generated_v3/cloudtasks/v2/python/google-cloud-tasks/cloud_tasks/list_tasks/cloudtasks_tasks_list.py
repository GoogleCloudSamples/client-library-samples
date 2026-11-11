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

# [START cloudtasks_v2_cloudtasks_tasks_list]
from google.api_core import exceptions
from google.cloud import tasks_v2


def list_tasks(project_id: str, location_id: str, queue_id: str) -> None:
    """List tasks in a Cloud Tasks queue.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the queue is located (for example, 'us-central1').
        queue_id: The ID of the queue (for example, 'example-queue-id').
    """
    client = tasks_v2.CloudTasksClient()

    parent = client.queue_path(project_id, location_id, queue_id)

    request = tasks_v2.ListTasksRequest(parent=parent)

    try:
        response = client.list_tasks(request=request)
        for task in response:
            print(f"Task name: {task.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudtasks_v2_cloudtasks_tasks_list]
