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

# [START cloudbuild_v1_cloudbuild_workerpool_create]
from google.api_core import exceptions
from google.cloud.devtools import cloudbuild_v1


def create_worker_pool(
    project_id: str, location_id: str, worker_pool_id: str
) -> None:
    """Creates a private worker pool in Cloud Build.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the resource is located (for example, 'us-central1')
        worker_pool_id: ID of the WorkerPool (for example, 'example-workerpool-id')
    """
    client = cloudbuild_v1.CloudBuildClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    worker_pool = cloudbuild_v1.WorkerPool(
        private_pool_v1_config=cloudbuild_v1.PrivatePoolV1Config(
            worker_config=cloudbuild_v1.PrivatePoolV1Config.WorkerConfig(
                disk_size_gb=100,
                machine_type="e2-standard-4",
            ),
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
    except exceptions.GoogleAPICallError as error:
        print(f"Error creating worker pool: {error}")


# [END cloudbuild_v1_cloudbuild_workerpool_create]
