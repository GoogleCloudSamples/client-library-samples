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

# [START notebooks_v1_notebookservice_schedule_get]
import google.api_core.exceptions
from google.cloud import notebooks_v1

client = notebooks_v1.NotebookServiceClient()


def get_schedule(project_id: str, location_id: str, schedule_id: str) -> None:
    """Retrieve details of a notebook schedule.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the notebook schedule is located (for example, 'us-central1').
        schedule_id: The user-defined identifier of the notebook schedule.
    """
    name = f"projects/{project_id}/locations/{location_id}/schedules/{schedule_id}"

    request = notebooks_v1.GetScheduleRequest(
        name=name,
    )

    try:
        response = client.get_schedule(request=request)
        print(f"Schedule retrieved: {response.name}")
        print(f"Cron expression: {response.cron_schedule}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve schedule: {error}")
# [END notebooks_v1_notebookservice_schedule_get]
