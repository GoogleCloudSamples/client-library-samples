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

# [START batch_v1alpha_batchservice_job_create]
import google.api_core.exceptions
from google.cloud import batch_v1alpha


def create_job(project_id: str, location_id: str) -> None:
    """Creates a Batch job in the specified Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    client = batch_v1alpha.BatchServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    runnable = batch_v1alpha.Runnable()
    runnable.script = batch_v1alpha.Runnable.Script(
        text="echo Hello from Google Cloud Batch"
    )

    task_spec = batch_v1alpha.TaskSpec()
    task_spec.runnables = [runnable]

    task_group = batch_v1alpha.TaskGroup()
    task_group.task_count = 1
    task_group.task_spec = task_spec

    job = batch_v1alpha.Job()
    job.task_groups = [task_group]
    job.logs_policy = batch_v1alpha.LogsPolicy(
        destination=batch_v1alpha.LogsPolicy.Destination.CLOUD_LOGGING
    )

    try:
        response = client.create_job(
            parent=parent,
            job=job,
        )
        print(f"Job created successfully: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create job: {error}")
# [END batch_v1alpha_batchservice_job_create]
