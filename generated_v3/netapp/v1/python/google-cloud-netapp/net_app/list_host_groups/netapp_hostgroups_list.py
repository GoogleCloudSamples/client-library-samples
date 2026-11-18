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

# [START netapp_v1_netapp_hostgroups_list]
import google.api_core.exceptions
from google.cloud import netapp_v1

client = netapp_v1.NetAppClient()


def list_host_groups(project_id: str, location_id: str) -> None:
    """Lists NetApp host groups in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1')
          or '-' to list across all locations.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = netapp_v1.ListHostGroupsRequest(
        parent=parent,
    )

    try:
        response = client.list_host_groups(request=request)
        for host_group in response:
            print(f"Host group name: {host_group.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list host groups: {error}")
# [END netapp_v1_netapp_hostgroups_list]
