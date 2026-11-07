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

# [START networkconnectivity_v1_hubservice_group_get]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1

client = networkconnectivity_v1.HubServiceClient()


def get_group(project_id: str, hub_id: str, group_id: str) -> None:
    """Retrieves details of an existing Network Connectivity Center group.

    Args:
        project_id: The Google Cloud project ID.
        hub_id: The ID of the Network Connectivity Center hub.
        group_id: The ID of the Network Connectivity Center group (for example, 'default', 'center', or 'edge').
    """
    name = f"projects/{project_id}/locations/global/hubs/{hub_id}/groups/{group_id}"

    try:
        response = client.get_group(name=name)
        print(f"Group name: {response.name}")
        print(f"Group state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END networkconnectivity_v1_hubservice_group_get]
