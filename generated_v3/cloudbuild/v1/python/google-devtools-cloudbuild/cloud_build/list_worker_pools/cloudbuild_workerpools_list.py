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

# [START cloudbuild_v1_cloudbuild_workerpools_list]
import google.api_core.exceptions
from google.cloud.devtools import cloudbuild_v1


def list_worker_pools(project_id: str, location_id: str) -> None:
    """List Cloud Build worker pools in a location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'us-central1').
    """
    client = cloudbuild_v1.CloudBuildClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = cloudbuild_v1.ListWorkerPoolsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_worker_pools(request=request)
        for worker_pool in page_result:
            print(f"Worker pool name: {worker_pool.name}")
            print(f"Worker pool state: {worker_pool.state}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list worker pools: {e}")
# [END cloudbuild_v1_cloudbuild_workerpools_list]
