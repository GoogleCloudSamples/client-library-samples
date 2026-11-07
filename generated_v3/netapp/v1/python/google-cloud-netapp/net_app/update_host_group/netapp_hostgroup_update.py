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

# [START netapp_v1_netapp_hostgroup_update]
import google.api_core.exceptions
from google.cloud import netapp_v1
from google.protobuf import field_mask_pb2

client = netapp_v1.NetAppClient()


def update_host_group(location_id: str, host_group_id: str, project_id: str) -> None:
    """Updates a NetApp host group.

    Args:
        location_id: Google Cloud location of the host group.
        host_group_id: Identifier of the host group to update.
        project_id: Google Cloud project ID.
    """
    host_group = netapp_v1.HostGroup(
        name=f"projects/{project_id}/locations/{location_id}/hostGroups/{host_group_id}",
        description="Updated host group description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_host_group(
            request=netapp_v1.UpdateHostGroupRequest(
                host_group=host_group,
                update_mask=update_mask,
            )
        )
        response = operation.result()
        print(f"Updated host group: {response.name}")
        print(f"Host group description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update host group: {e}")
# [END netapp_v1_netapp_hostgroup_update]
