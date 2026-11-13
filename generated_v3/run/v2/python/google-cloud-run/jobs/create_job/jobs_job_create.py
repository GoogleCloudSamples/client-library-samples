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

# [START run_v2_jobs_job_create]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.JobsClient()


def create_job(project_id: str, location_id: str, job_id: str) -> None:
    """Use the create_job method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        job_id: ID of the Job (for example, 'example-job-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    container = run_v2.Container(
        image="us-docker.pkg.dev/cloudrun/container/job:latest"
    )
    task_template = run_v2.TaskTemplate(containers=[container])
    execution_template = run_v2.ExecutionTemplate(template=task_template)
    job = run_v2.Job(template=execution_template)

    try:
        operation = client.create_job(parent=parent, job=job, job_id=job_id)
        response = operation.result()
        print(f"Created job: {response.name}")
    except google.api_core.exceptions.AlreadyExists:
        print(f"Job {job_id} already exists in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create job: {e}")
# [END run_v2_jobs_job_create]
