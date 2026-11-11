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

# [START tpu_v2_tpu_nodes_list]
import google.api_core.exceptions
from google.cloud import tpu_v2


def list_nodes(project_id: str, location_id: str) -> None:
    """List Cloud TPU nodes in a designated location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, 'us-central1-a') where the TPU nodes are located.
    """
    client = tpu_v2.TpuClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = tpu_v2.ListNodesRequest(parent=parent)
        page_result = client.list_nodes(request=request)

        has_nodes = False
        for node in page_result:
            has_nodes = True
            print(f"Node Name: {node.name}")
            print(f"State: {node.state.name}")
            print(f"Accelerator Type: {node.accelerator_type}")

        if not has_nodes:
            print(f"No TPU nodes found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing TPU nodes: {error}")
# [END tpu_v2_tpu_nodes_list]
