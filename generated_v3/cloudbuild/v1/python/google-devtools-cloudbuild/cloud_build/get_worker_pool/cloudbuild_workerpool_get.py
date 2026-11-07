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

# [START cloudbuild_v1_cloudbuild_workerpool_get]
import google.api_core.exceptions
from google.cloud.devtools import cloudbuild_v1


def get_worker_pool(project_id: str, location_id: str, worker_pool_id: str) -> None:
    """Retrieves an existing Cloud Build worker pool.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the worker pool resides (for example, 'us-central1').
        worker_pool_id: The caller-specified ID of the worker pool (for example, 'example-workerpool-id').
    """
    client = cloudbuild_v1.CloudBuildClient()

    name = f"projects/{project_id}/locations/{location_id}/workerPools/{worker_pool_id}"

    request = cloudbuild_v1.GetWorkerPoolRequest(name=name)

    try:
        response = client.get_worker_pool(request=request)
        print(f"Worker pool name: {response.name}")
        print(f"Worker pool state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve worker pool: {e}")
# [END cloudbuild_v1_cloudbuild_workerpool_get]
