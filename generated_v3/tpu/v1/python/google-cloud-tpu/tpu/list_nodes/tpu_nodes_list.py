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

# [START tpu_v1_tpu_nodes_list]
from google.api_core import exceptions
from google.cloud import tpu_v1


def list_nodes(project_id: str, location_id: str) -> None:
    """Lists Cloud TPU nodes in the specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or zone hosting the TPU nodes
          (for example, us-central1-b).
    """
    client = tpu_v1.TpuClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        nodes = client.list_nodes(parent=parent)
        node_found = False
        for node in nodes:
            node_found = True
            print(f"Node name: {node.name}")
            print(f"Accelerator type: {node.accelerator_type}")
            print(f"State: {node.state.name}")

        if not node_found:
            print(f"No TPU nodes found in {parent}.")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list TPU nodes: {error}")
# [END tpu_v1_tpu_nodes_list]
