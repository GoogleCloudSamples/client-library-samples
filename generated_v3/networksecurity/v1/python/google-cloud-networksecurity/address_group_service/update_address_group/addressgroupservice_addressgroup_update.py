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

# [START networksecurity_v1_addressgroupservice_addressgroup_update]
import google.api_core.exceptions
from google.cloud import network_security_v1
from google.protobuf import field_mask_pb2


def update_address_group(
    project_id: str, location_id: str, address_group_id: str
) -> None:
    """Updates an AddressGroup resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location of the AddressGroup (for example, 'global' or a
            specific region).
        address_group_id: The identifier of the address group to update.
    """
    client = network_security_v1.AddressGroupServiceClient()

    resource_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"addressGroups/{address_group_id}"
    )
    address_group = network_security_v1.AddressGroup(
        name=resource_name,
        description="Updated description for the address group",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    request = network_security_v1.UpdateAddressGroupRequest(
        address_group=address_group,
        update_mask=update_mask,
    )

    try:
        operation = client.update_address_group(request=request)
        response = operation.result()
        print(f"Updated AddressGroup: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update AddressGroup: {error}")
# [END networksecurity_v1_addressgroupservice_addressgroup_update]
