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

# [START batch_v1alpha_batchservice_job_delete]
import google.api_core.exceptions
from google.cloud import batch_v1alpha

client = batch_v1alpha.BatchServiceClient()


def delete_job(project_id: str, location_id: str, job_id: str) -> None:
    """Deletes a Batch job using the delete_job method.

    Args:
        project_id: The Google Cloud project ID where the Batch job resides.
        location_id: The Google Cloud region where the Batch job is located (for
          example, 'us-central1').
        job_id: The ID of the Batch job to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/jobs/{job_id}"

    try:
        operation = client.delete_job(name=name)
        print(f"Waiting for job deletion to complete: {name}")
        operation.result()
        print(f"Job deleted successfully: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Job not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete job: {error}")
# [END batch_v1alpha_batchservice_job_delete]
