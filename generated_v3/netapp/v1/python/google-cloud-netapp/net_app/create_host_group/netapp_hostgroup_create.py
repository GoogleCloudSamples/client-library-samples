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

# [START netapp_v1_netapp_hostgroup_create]
import google.api_core.exceptions
from google.cloud import netapp_v1


def create_host_group(host_group_id: str, project_id: str, location_id: str) -> None:
    """Creates a NetApp host group resource.

    Args:
        host_group_id: ID of the host group to create. Must be unique within the
            parent resource.
        project_id: The Google Cloud project ID.
        location_id: The NetApp location or region (for example, 'us-central1').
    """
    client = netapp_v1.NetAppClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    host_group = netapp_v1.HostGroup(
        type_=netapp_v1.HostGroup.Type.ISCSI_INITIATOR,
        os_type="LINUX",
        hosts=["iqn.1994-05.com.redhat:example"],
    )

    try:
        # CreateHostGroup returns a long-running operation.
        operation = client.create_host_group(
            parent=parent,
            host_group_id=host_group_id,
            host_group=host_group,
        )
        response = operation.result()
        print(f"Created host group: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END netapp_v1_netapp_hostgroup_create]
