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

# [START run_v2_workerpools_workerpools_list]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.WorkerPoolsClient()


def list_worker_pools(project_id: str) -> None:
    """Lists WorkerPool resources in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    parent = f"projects/{project_id}/locations/us-central1"

    request = run_v2.ListWorkerPoolsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_worker_pools(request=request)
        for worker_pool in page_result:
            print(f"Worker pool name: {worker_pool.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list worker pools: {error}")
# [END run_v2_workerpools_workerpools_list]
