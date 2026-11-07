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

# [START storagetransfer_v1_storagetransferservice_run_transfer_job]
import google.api_core.exceptions
from google.cloud import storage_transfer_v1


def run_transfer_job(project_id: str, job_name: str) -> None:
    """Runs a transfer job immediately and waits for the operation to complete.

    Args:
        project_id: The ID of the Google Cloud project that owns the transfer job.
        job_name: The resource name of the transfer job to run, formatted as 'transferJobs/{job_id}'.
    """
    client = storage_transfer_v1.StorageTransferServiceClient()

    request = storage_transfer_v1.RunTransferJobRequest(
        job_name=job_name,
        project_id=project_id,
    )

    try:
        operation = client.run_transfer_job(request=request)
        print(f"Started transfer operation: {operation.operation.name}")

        # Block until the long-running transfer operation completes.
        operation.result()
        print(f"Transfer job execution completed: {job_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to run transfer job: {error}")
# [END storagetransfer_v1_storagetransferservice_run_transfer_job]
