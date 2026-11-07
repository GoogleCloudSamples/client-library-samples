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

# [START networksecurity_v1_addressgroupservice_addressgroup_create]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import network_security_v1


def create_address_group(
    project_id: str, location_id: str, address_group_id: str
) -> None:
    """Creates an AddressGroup resource.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud location (region or 'global') where the
          AddressGroup is created (for example, 'global' or 'us-central1').
        address_group_id: A caller-chosen identifier for the AddressGroup, 1-63
          characters long, containing only lowercase letters, numbers, hyphens,
          and underscores, and starting with a letter (for example,
          'example-address-group').
    """
    client = network_security_v1.AddressGroupServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    address_group = network_security_v1.AddressGroup(
        type_=network_security_v1.AddressGroup.Type.IPV4,
        capacity=100,
        description="Example address group",
        items=["192.0.2.0/24"],
    )

    try:
        operation = client.create_address_group(
            parent=parent,
            address_group=address_group,
            address_group_id=address_group_id,
        )
        response = operation.result()
        print(f"Created AddressGroup: {response.name}")
    except GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END networksecurity_v1_addressgroupservice_addressgroup_create]
