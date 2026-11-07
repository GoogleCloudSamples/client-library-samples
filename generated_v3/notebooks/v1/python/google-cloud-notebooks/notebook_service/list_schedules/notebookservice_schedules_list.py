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

# [START notebooks_v1_notebookservice_schedules_list]
import google.api_core.exceptions
from google.cloud import notebooks_v1

client = notebooks_v1.NotebookServiceClient()


def list_schedules(project_id: str, location_id: str) -> None:
    """Lists notebook execution schedules in a given location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = notebooks_v1.ListSchedulesRequest(parent=parent)
        page_result = client.list_schedules(request=request)

        for schedule in page_result:
            print(f"Schedule name: {schedule.name}")
            print(f"State: {schedule.state.name}")
            print(f"Cron schedule: {schedule.cron_schedule}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END notebooks_v1_notebookservice_schedules_list]
