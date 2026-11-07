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

# [START networksecurity_v1_addressgroupservice_addressgroupreferences_list]
import google.api_core.exceptions
from google.cloud import network_security_v1


def list_address_group_references(
    projects_organization_id: str, location_id: str, address_group_id: str
) -> None:
    """Lists the resources referencing an address group.

    Args:
        projects_organization_id: ID of the project or organization (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        address_group_id: ID of the address group (for example, 'example-addressgroup-id').
    """
    client = network_security_v1.AddressGroupServiceClient()

    address_group = (
        f"projects/{projects_organization_id}/locations/{location_id}/addressGroups/{address_group_id}"
    )

    request = network_security_v1.ListAddressGroupReferencesRequest(
        address_group=address_group,
    )

    try:
        page_result = client.list_address_group_references(request=request)
        count = 0
        for reference in page_result:
            count += 1
            print(f"Referenced by security policy: {reference.security_policy}")
            print(f"Rule priority: {reference.rule_priority}")
        print(f"Total references found: {count}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END networksecurity_v1_addressgroupservice_addressgroupreferences_list]
