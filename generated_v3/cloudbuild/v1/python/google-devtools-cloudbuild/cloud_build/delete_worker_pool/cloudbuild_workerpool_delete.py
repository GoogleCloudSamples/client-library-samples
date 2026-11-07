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

# [START cloudbuild_v1_cloudbuild_workerpool_delete]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud.devtools import cloudbuild_v1


def delete_worker_pool(
    project_id: str, location_id: str, worker_pool_id: str
) -> None:
    """Deletes a Cloud Build worker pool.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        worker_pool_id: The ID of the worker pool (for example, 'example-workerpool-id').
    """
    client = cloudbuild_v1.CloudBuildClient()

    name = client.worker_pool_path(project_id, location_id, worker_pool_id)
    request = cloudbuild_v1.DeleteWorkerPoolRequest(
        name=name,
    )

    try:
        operation = client.delete_worker_pool(request=request)
        operation.result()
        print(f"Deleted worker pool: {name}")
    except GoogleAPICallError as e:
        print(f"Failed to delete worker pool: {e}")
# [END cloudbuild_v1_cloudbuild_workerpool_delete]
