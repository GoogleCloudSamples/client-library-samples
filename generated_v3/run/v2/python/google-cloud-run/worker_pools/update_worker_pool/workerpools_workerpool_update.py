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

# [START run_v2_workerpools_workerpool_update]
import google.api_core.exceptions
from google.cloud import run_v2
from google.protobuf import field_mask_pb2

client = run_v2.WorkerPoolsClient()


def update_worker_pool(project_id: str, location_id: str, worker_pool_id: str) -> None:
    """Updates an existing Cloud Run WorkerPool.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the WorkerPool is located (for example, 'us-central1').
        worker_pool_id: The unique identifier of the existing WorkerPool to update.
    """
    worker_pool_name = (
        f"projects/{project_id}/locations/{location_id}/workerPools/{worker_pool_id}"
    )

    worker_pool = run_v2.WorkerPool(
        name=worker_pool_name,
        description="Updated worker pool configuration",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        request = run_v2.UpdateWorkerPoolRequest(
            worker_pool=worker_pool,
            update_mask=update_mask,
        )
        operation = client.update_worker_pool(request=request)
        response = operation.result()
        print(f"Updated worker pool: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update worker pool: {error}")
# [END run_v2_workerpools_workerpool_update]
