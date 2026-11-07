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

# [START tpu_v2alpha1_tpu_queuedresources_list]
import google.api_core.exceptions
from google.cloud import tpu_v2alpha1


def list_queued_resources(project_id: str, location_id: str) -> None:
    """Lists queued TPU resources in a specific project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location hosting the queued resources.
    """
    client = tpu_v2alpha1.TpuClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = tpu_v2alpha1.ListQueuedResourcesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_queued_resources(request=request)
        found = False
        for queued_resource in page_result:
            print(f"Queued resource name: {queued_resource.name}")
            print(f"State: {queued_resource.state.name}")
            found = True

        if not found:
            print(f"No queued resources found in {location_id}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list queued resources: {error}")
# [END tpu_v2alpha1_tpu_queuedresources_list]
