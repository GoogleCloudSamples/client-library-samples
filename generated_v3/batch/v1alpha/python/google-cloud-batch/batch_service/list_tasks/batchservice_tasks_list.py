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

# [START batch_v1alpha_batchservice_tasks_list]
import google.api_core.exceptions
from google.cloud import batch_v1alpha

client = batch_v1alpha.BatchServiceClient()


def list_tasks(project_id: str, location_id: str, job_id: str, task_group_id: str) -> None:
    """List tasks in a specific task group.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        job_id: ID of the Job (for example, 'example-job-id')
        task_group_id: ID of the TaskGroup (for example, 'example-taskgroup-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}/taskGroups/{task_group_id}"

    request = batch_v1alpha.ListTasksRequest(parent=parent)

    try:
        response = client.list_tasks(request=request)
        for task in response:
            print(f"Task: {task.name}")
            print(f"State: {task.status.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list tasks: {e}")
# [END batch_v1alpha_batchservice_tasks_list]
