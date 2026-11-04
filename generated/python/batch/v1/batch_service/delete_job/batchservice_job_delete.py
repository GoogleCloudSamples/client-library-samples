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

# [START batch_v1_batchservice_job_delete]
import google.api_core.exceptions
from google.cloud import batch_v1

client = batch_v1.BatchServiceClient()


def delete_job(project_id: str, location_id: str, job_id: str) -> None:
    """Deletes a Batch job.

    Args:
        project_id: The Google Cloud project ID where the Batch job was created.
        location_id: The Google Cloud region where the target Batch job resides, such as 'us-central1'.
        job_id: The identifier of the existing Batch job to delete.
    """
    job_name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    try:
        # DeleteJob returns a long-running operation that must be awaited.
        operation = client.delete_job(name=job_name)
        operation.result()
        print(f"Deleted job: {job_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete job: {error}")
# [END batch_v1_batchservice_job_delete]
