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

# [START run_v2_workerpools_workerpool_get]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.WorkerPoolsClient()


def get_worker_pool(project_id: str, location_id: str, worker_pool_id: str) -> None:
    """Retrieves a Cloud Run worker pool.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region (for example, 'us-central1').
        worker_pool_id: The unique identifier of the WorkerPool.
    """
    name = f"projects/{project_id}/locations/{location_id}/workerPools/{worker_pool_id}"

    request = run_v2.GetWorkerPoolRequest(
        name=name,
    )

    try:
        response = client.get_worker_pool(request=request)
        print(f"Retrieved worker pool: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve worker pool: {e}")
# [END run_v2_workerpools_workerpool_get]
