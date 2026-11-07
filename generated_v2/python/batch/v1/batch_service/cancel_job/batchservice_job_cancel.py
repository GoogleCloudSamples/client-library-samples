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

# [START batch_v1_batchservice_job_cancel]
import google.api_core.exceptions
from google.cloud import batch_v1


def cancel_job(project_id: str, location_id: str, job_id: str) -> None:
    """Cancels an existing Batch job.

    Args:
        project_id: The Google Cloud project ID or project number.
        location_id: The Google Cloud region where the batch job is located.
        job_id: The identifier of the Batch job to cancel.
    """
    client = batch_v1.BatchServiceClient()
    name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    try:
        operation = client.cancel_job(name=name)
        # The Batch API returns a Job in the long-running operation response
        # rather than CancelJobResponse. Set the operation result type to Job.
        operation._result_type = batch_v1.Job
        print(f"Waiting for job cancellation to finish: {name}")
        operation.result()
        print(f"Job canceled: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to cancel job: {e}")
# [END batch_v1_batchservice_job_cancel]
