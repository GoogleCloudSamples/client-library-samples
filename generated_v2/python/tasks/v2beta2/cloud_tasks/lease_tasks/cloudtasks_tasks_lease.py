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

# [START cloudtasks_v2beta2_cloudtasks_lease_tasks]
import google.api_core.exceptions
from google.cloud import tasks_v2beta2
from google.protobuf import duration_pb2


def lease_tasks(project_id: str, location_id: str, queue_id: str) -> None:
    """Leases tasks from a pull queue.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        queue_id: ID of the Queue (for example, 'example-queue-id').
    """
    client = tasks_v2beta2.CloudTasksClient()

    parent = client.queue_path(project_id, location_id, queue_id)
    lease_duration = duration_pb2.Duration(seconds=600)

    request = tasks_v2beta2.LeaseTasksRequest(
        parent=parent,
        lease_duration=lease_duration,
        max_tasks=10,
        response_view=tasks_v2beta2.Task.View.FULL,
    )

    try:
        response = client.lease_tasks(request=request)
        for task in response.tasks:
            print(f"Leased task: {task.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END cloudtasks_v2beta2_cloudtasks_lease_tasks]
