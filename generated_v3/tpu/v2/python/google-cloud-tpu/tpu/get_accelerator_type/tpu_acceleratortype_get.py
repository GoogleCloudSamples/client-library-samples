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

# [START tpu_v2_tpu_acceleratortype_get]
import google.api_core.exceptions
from google.cloud import tpu_v2

client = tpu_v2.TpuClient()


def get_accelerator_type(
    project_id: str, location_id: str, accelerator_type_id: str
) -> None:
    """Retrieves details of a specific Cloud TPU accelerator type.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud zone or region for the TPU accelerator
          type (for example, 'us-central1-a').
        accelerator_type_id: The identifier of the accelerator type (for
          example, 'v2-8').
    """
    name = f"projects/{project_id}/locations/{location_id}/acceleratorTypes/{accelerator_type_id}"

    request = tpu_v2.GetAcceleratorTypeRequest(name=name)

    try:
        response = client.get_accelerator_type(request=request)
        print(f"Accelerator type name: {response.name}")
        print(f"Accelerator type: {response.type}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve accelerator type: {e}")


# [END tpu_v2_tpu_acceleratortype_get]
