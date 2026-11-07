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

# [START notebooks_v1_notebookservice_schedule_create]
import google.api_core.exceptions
from google.cloud import notebooks_v1

client = notebooks_v1.NotebookServiceClient()


def create_schedule(project_id: str, location_id: str, schedule_id: str) -> None:
    """Use the create_schedule method to create a recurring notebook execution schedule.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        schedule_id: ID of the Schedule (for example, 'example-schedule-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    schedule = notebooks_v1.Schedule(
        display_name="Example Schedule",
        description="A scheduled notebook execution",
        cron_schedule="0 0 * * *",
        time_zone="UTC",
        execution_template=notebooks_v1.ExecutionTemplate(
            scale_tier=notebooks_v1.ExecutionTemplate.ScaleTier.STANDARD_1,
            master_type="n1-standard-4",
            input_notebook_file="gs://example-bucket/example-notebook.ipynb",
            output_notebook_folder="gs://example-bucket/output-folder",
        ),
    )

    try:
        operation = client.create_schedule(
            parent=parent,
            schedule_id=schedule_id,
            schedule=schedule,
        )
        response = operation.result()
        print(f"Created schedule: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Schedule creation failed: {e}")
# [END notebooks_v1_notebookservice_schedule_create]
