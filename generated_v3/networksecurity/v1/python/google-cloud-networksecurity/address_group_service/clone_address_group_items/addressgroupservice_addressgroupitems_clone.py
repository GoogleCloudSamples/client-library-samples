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

# [START networksecurity_v1_addressgroupservice_clone_address_group_items]
from google.api_core import exceptions
from google.cloud import network_security_v1


def clone_address_group_items(
    project_id: str,
    location_id: str,
    address_group_id: str,
    source_address_group_id: str,
) -> None:
    """Clones items from a source address group into a destination address group.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        address_group_id: The ID of the destination AddressGroup to receive cloned items.
        source_address_group_id: The ID of the source AddressGroup from which items are cloned.
    """
    client = network_security_v1.AddressGroupServiceClient()

    address_group = (
        f"projects/{project_id}/locations/{location_id}/addressGroups/{address_group_id}"
    )
    source_address_group = (
        f"projects/{project_id}/locations/{location_id}/addressGroups/{source_address_group_id}"
    )

    request = network_security_v1.CloneAddressGroupItemsRequest(
        address_group=address_group,
        source_address_group=source_address_group,
    )

    try:
        operation = client.clone_address_group_items(request=request)
        response = operation.result()
        print(f"Cloned items into address group: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to clone address group items: {error}")
# [END networksecurity_v1_addressgroupservice_clone_address_group_items]
