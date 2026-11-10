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

# [START batch_v1alpha_batchservice_job_cancel]
import google.api_core.exceptions
from google.cloud import batch_v1alpha


def cancel_job(project_id: str, location_id: str, job_id: str) -> None:
    """Cancels a Google Cloud Batch job.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Batch job is located (for example, 'us-central1').
        job_id: The identifier of the Batch Job to cancel.
    """
    client = batch_v1alpha.BatchServiceClient()
    name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    try:
        # CancelJob initiates a long-running operation.
        operation = client.cancel_job(name=name)
        # The Batch API operation response contains a Job proto rather than CancelJobResponse.
        operation._result_type = batch_v1alpha.Job
        operation.result()
        print(f"Job canceled: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to cancel job: {error}")
# [END batch_v1alpha_batchservice_job_cancel]
