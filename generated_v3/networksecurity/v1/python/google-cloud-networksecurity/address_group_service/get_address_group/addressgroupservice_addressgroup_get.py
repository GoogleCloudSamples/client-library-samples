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

# [START networksecurity_v1_addressgroupservice_addressgroup_get]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import network_security_v1


def get_address_group(
    project_id: str, location_id: str, address_group_id: str
) -> None:
    """Gets details of an address group.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The location ID (for example, 'us-central1').
        address_group_id: The address group ID (for example, 'example-addressgroup-id').
    """
    client = network_security_v1.AddressGroupServiceClient()

    name = client.address_group_path(project_id, location_id, address_group_id)

    try:
        response = client.get_address_group(name=name)
        print(f"Retrieved address group: {response.name}")
        print(f"Capacity: {response.capacity}")
        print(f"Items count: {len(response.items)}")
    except GoogleAPICallError as error:
        print(f"Error retrieving address group: {error}")


# [END networksecurity_v1_addressgroupservice_addressgroup_get]
