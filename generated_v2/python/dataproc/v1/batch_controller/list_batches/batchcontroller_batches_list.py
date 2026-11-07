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

# [START dataproc_v1_batchcontroller_batches_list]
import google.api_core.exceptions
from google.cloud import dataproc_v1


def list_batches(project_id: str, location_id: str) -> None:
    """List Dataproc batches in a specified project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Dataproc region where batches are executed (for
          example, 'us-central1').
    """
    client = dataproc_v1.BatchControllerClient(
        client_options={"api_endpoint": f"{location_id}-dataproc.googleapis.com:443"}
    )
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = dataproc_v1.ListBatchesRequest(parent=parent)
        page_result = client.list_batches(request=request)

        for batch in page_result:
            print(f"Batch name: {batch.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dataproc_v1_batchcontroller_batches_list]
