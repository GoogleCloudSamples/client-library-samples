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

# [START netapp_v1_netapp_hostgroup_get]
import google.api_core.exceptions
from google.cloud import netapp_v1

client = netapp_v1.NetAppClient()


def get_host_group(location_id: str, host_group_id: str, project_id: str) -> None:
    """Retrieves details of an existing NetApp host group.

    Args:
        location_id: The Google Cloud region where the host group is located (for example, 'us-central1').
        host_group_id: The ID of the host group to retrieve.
        project_id: The ID of the Google Cloud project.
    """
    name = f"projects/{project_id}/locations/{location_id}/hostGroups/{host_group_id}"

    try:
        request = netapp_v1.GetHostGroupRequest(name=name)
        response = client.get_host_group(request=request)

        print(f"Retrieved host group: {response.name}")
        print(f"Host group state: {response.state}")
    except google.api_core.exceptions.GoogleAPICallError as err:
        print(f"Failed to retrieve host group: {err}")
# [END netapp_v1_netapp_hostgroup_get]
