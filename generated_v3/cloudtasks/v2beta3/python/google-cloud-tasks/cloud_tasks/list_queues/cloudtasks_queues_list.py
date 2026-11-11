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

# [START cloudtasks_v2beta3_cloudtasks_queues_list]
import google.api_core.exceptions
from google.cloud import tasks_v2beta3


def list_queues(project_id: str, location_id: str) -> None:
    """List Cloud Tasks queues in a given location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = tasks_v2beta3.CloudTasksClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = tasks_v2beta3.ListQueuesRequest(parent=parent)

    try:
        response = client.list_queues(request=request)
        for queue in response:
            print(f"Queue: {queue.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudtasks_v2beta3_cloudtasks_queues_list]
