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

# [START memorystore_v1beta_memorystore_instances_list]
import google.api_core.exceptions
from google.cloud import memorystore_v1beta

client = memorystore_v1beta.MemorystoreClient()


def list_instances(project_id: str, location_id: str) -> None:
    """Lists Memorystore instances in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, us-central1) or '-' to query instances across all locations.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = memorystore_v1beta.ListInstancesRequest(
        parent=parent,
    )

    try:
        response = client.list_instances(request=request)
        for instance in response:
            print(f"Instance name: {instance.name}")
            print(f"State: {instance.state}")
            print(f"Node size (GB): {instance.node_config.size_gb}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list instances: {error}")
# [END memorystore_v1beta_memorystore_instances_list]
