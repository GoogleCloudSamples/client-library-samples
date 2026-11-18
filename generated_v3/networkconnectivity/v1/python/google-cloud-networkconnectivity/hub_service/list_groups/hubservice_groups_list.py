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

# [START networkconnectivity_v1_hubservice_groups_list]
import google.api_core.exceptions
from google.cloud import networkconnectivity_v1

client = networkconnectivity_v1.HubServiceClient()


def list_groups(project_id: str, hub_id: str) -> None:
    """Lists groups within a Network Connectivity Center hub.

    Args:
        project_id: The Google Cloud project ID containing the Network Connectivity Center hub.
        hub_id: The ID of the Network Connectivity Center hub.
    """
    parent = f"projects/{project_id}/locations/global/hubs/{hub_id}"

    request = networkconnectivity_v1.ListGroupsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_groups(request=request)
        for group in page_result:
            print(f"Group name: {group.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list groups: {error}")
# [END networkconnectivity_v1_hubservice_groups_list]
