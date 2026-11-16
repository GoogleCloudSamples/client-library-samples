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

# [START run_v2_workerpools_workerpool_create]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.WorkerPoolsClient()


def create_worker_pool(project_id: str, worker_pool_id: str, location_id: str) -> None:
    """Use the create_worker_pool method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        worker_pool_id: The unique identifier for the WorkerPool (for example, 'example-worker-pool').
        location_id: The Google Cloud region (for example, 'us-central1').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    worker_pool = run_v2.WorkerPool(
        template=run_v2.WorkerPoolRevisionTemplate(
            containers=[
                run_v2.Container(
                    image="us-docker.pkg.dev/cloudrun/container/hello"
                )
            ]
        )
    )

    try:
        operation = client.create_worker_pool(
            parent=parent,
            worker_pool=worker_pool,
            worker_pool_id=worker_pool_id,
        )
        response = operation.result()
        print(f"Created worker pool: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error creating worker pool: {error.message}")
# [END run_v2_workerpools_workerpool_create]
