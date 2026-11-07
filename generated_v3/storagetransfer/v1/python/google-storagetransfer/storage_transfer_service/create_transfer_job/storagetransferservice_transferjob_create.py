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

# [START storagetransfer_v1_storagetransferservice_transferjob_create]
import google.api_core.exceptions
from google.cloud import storage_transfer_v1


def create_transfer_job(
    project_id: str, source_bucket_name: str, sink_bucket_name: str
) -> None:
    """Creates a transfer job between Cloud Storage buckets.

    Args:
        project_id: The ID of the Google Cloud project that owns the transfer job.
        source_bucket_name: The name of the source Cloud Storage bucket containing objects to transfer.
        sink_bucket_name: The name of the destination Cloud Storage bucket to receive transferred objects.
    """
    client = storage_transfer_v1.StorageTransferServiceClient()

    transfer_job = storage_transfer_v1.TransferJob(
        project_id=project_id,
        status=storage_transfer_v1.TransferJob.Status.ENABLED,
        transfer_spec=storage_transfer_v1.TransferSpec(
            gcs_data_source=storage_transfer_v1.GcsData(
                bucket_name=source_bucket_name
            ),
            gcs_data_sink=storage_transfer_v1.GcsData(
                bucket_name=sink_bucket_name
            ),
        ),
    )

    try:
        request = storage_transfer_v1.CreateTransferJobRequest(
            transfer_job=transfer_job
        )
        response = client.create_transfer_job(request=request)
        print(f"Created transfer job: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to create transfer job: {exc}")
# [END storagetransfer_v1_storagetransferservice_transferjob_create]
