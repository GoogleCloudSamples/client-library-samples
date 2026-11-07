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

# [START notebooks_v1_notebookservice_schedule_delete]
import google.api_core.exceptions
from google.cloud import notebooks_v1

client = notebooks_v1.NotebookServiceClient()


def delete_schedule(project_id: str, location_id: str, schedule_id: str) -> None:
    """Delete a notebook schedule.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        schedule_id: ID of the Schedule (for example, 'example-schedule-id')
    """
    name = f"projects/{project_id}/locations/{location_id}/schedules/{schedule_id}"

    try:
        operation = client.delete_schedule(name=name)
        operation.result()
        print(f"Deleted schedule: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END notebooks_v1_notebookservice_schedule_delete]
