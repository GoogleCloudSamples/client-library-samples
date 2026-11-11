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

# [START tpu_v2alpha1_tpu_acceleratortype_get]
import google.api_core.exceptions
from google.cloud import tpu_v2alpha1

client = tpu_v2alpha1.TpuClient()


def get_accelerator_type(
    project_id: str, location_id: str, accelerator_type_id: str
) -> None:
    """Retrieve details of a specific TPU accelerator type.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or zone hosting the accelerator type.
        accelerator_type_id: The identifier of the TPU accelerator type.
    """
    name = f"projects/{project_id}/locations/{location_id}/acceleratorTypes/{accelerator_type_id}"

    request = tpu_v2alpha1.GetAcceleratorTypeRequest(name=name)

    try:
        response = client.get_accelerator_type(request=request)
        print(f"Retrieved accelerator type: {response.name}")
        print(f"Accelerator type identifier: {response.type_}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END tpu_v2alpha1_tpu_acceleratortype_get]
