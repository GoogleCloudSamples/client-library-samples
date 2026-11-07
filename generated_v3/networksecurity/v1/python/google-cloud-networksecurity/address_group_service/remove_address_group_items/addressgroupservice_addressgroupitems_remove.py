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

# [START networksecurity_v1_addressgroupservice_remove_address_group_items]
import google.api_core.exceptions
from google.cloud import network_security_v1


def remove_address_group_items(
    projects_organization_id: str, location_id: str, address_group_id: str
) -> None:
    """Removes items from an address group.

    Args:
        projects_organization_id: The ID of the project or organization.
        location_id: The Google Cloud region where the service is located.
        address_group_id: The ID of the address group.
    """
    client = network_security_v1.AddressGroupServiceClient()

    address_group = (
        f"projects/{projects_organization_id}/locations/{location_id}/"
        f"addressGroups/{address_group_id}"
    )
    items = "192.0.2.0/24"

    request = network_security_v1.RemoveAddressGroupItemsRequest(
        address_group=address_group,
        items=[items],
    )

    try:
        operation = client.remove_address_group_items(request=request)
        response = operation.result()
        print(f"Removed items from address group: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to remove address group items: {error}")
# [END networksecurity_v1_addressgroupservice_remove_address_group_items]
