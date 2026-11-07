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

# [START dataproc_v1_batchcontroller_batch_get]
import google.api_core.exceptions
from google.cloud import dataproc_v1


def get_batch(project_id: str, location_id: str, batch_id: str) -> None:
    """Retrieve an existing batch workload.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the batch workload is
          located (for example, 'us-central1').
        batch_id: The ID of the batch workload (for example,
          'example-batch-id').
    """
    client = dataproc_v1.BatchControllerClient(
        client_options={"api_endpoint": f"{location_id}-dataproc.googleapis.com:443"}
    )

    name = f"projects/{project_id}/locations/{location_id}/batches/{batch_id}"

    try:
        response = client.get_batch(name=name)
        print(f"Batch name: {response.name}")
        print(f"Batch state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to get batch: {e}")
# [END dataproc_v1_batchcontroller_batch_get]
