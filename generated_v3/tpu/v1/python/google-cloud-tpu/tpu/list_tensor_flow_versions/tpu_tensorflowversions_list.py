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

# [START tpu_v1_tpu_tensorflowversions_list]
import google.api_core.exceptions
from google.cloud import tpu_v1

client = tpu_v1.TpuClient()


def list_tensor_flow_versions(project_id: str, location_id: str) -> None:
    """Lists TensorFlow versions available for a project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone hosting TPU resources (for example, 'us-central1-b').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = tpu_v1.ListTensorFlowVersionsRequest(
        parent=parent,
    )

    try:
        response = client.list_tensor_flow_versions(request=request)
        for version in response:
            print(f"Name: {version.name}")
            print(f"Version: {version.version}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list TensorFlow versions: {error}")
# [END tpu_v1_tpu_tensorflowversions_list]
