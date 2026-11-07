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

# [START cloudtasks_v2beta3_cloudtasks_resume_queue]
import google.api_core.exceptions
from google.cloud import tasks_v2beta3


def resume_queue(project_id: str, location_id: str, queue_id: str) -> None:
    """Resumes a paused Cloud Tasks queue.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        queue_id: ID of the Queue (for example, 'example-queue-id')
    """
    client = tasks_v2beta3.CloudTasksClient()

    name = client.queue_path(project_id, location_id, queue_id)
    request = tasks_v2beta3.ResumeQueueRequest(name=name)

    try:
        response = client.resume_queue(request=request)
        print(f"Resumed queue: {response.name}")
        print(f"Queue state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to resume queue: {error}")
# [END cloudtasks_v2beta3_cloudtasks_resume_queue]
