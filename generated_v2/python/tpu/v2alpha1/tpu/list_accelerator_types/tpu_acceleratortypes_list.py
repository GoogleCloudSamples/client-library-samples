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

# [START tpu_v2alpha1_tpu_acceleratortypes_list]
import google.api_core.exceptions
from google.cloud import tpu_v2alpha1

client = tpu_v2alpha1.TpuClient()


def list_accelerator_types(project_id: str, location_id: str) -> None:
    """List Cloud TPU accelerator types in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, 'us-central1-a') in
          which to list accelerator types.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = tpu_v2alpha1.ListAcceleratorTypesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_accelerator_types(request=request)
        for accelerator_type in page_result:
            print(f"Accelerator type: {accelerator_type.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list accelerator types: {error}")
# [END tpu_v2alpha1_tpu_acceleratortypes_list]
