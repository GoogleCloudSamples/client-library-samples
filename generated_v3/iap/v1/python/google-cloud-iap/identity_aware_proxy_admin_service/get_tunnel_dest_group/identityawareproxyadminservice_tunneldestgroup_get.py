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

# [START iap_v1_identityawareproxyadminservice_tunneldestgroup_get]
import google.api_core.exceptions
from google.cloud import iap_v1

client = iap_v1.IdentityAwareProxyAdminServiceClient()


def get_tunnel_dest_group(
    location_id: str, project_id: str, dest_group_id: str
) -> None:
    """Retrieves an Identity-Aware Proxy (IAP) tunnel destination group.

    Args:
        location_id: The Google Cloud region or location where the IAP tunnel is configured (for example, 'us-central1').
        project_id: The Google Cloud project ID.
        dest_group_id: The ID of the destination group to retrieve (must be 4-63 characters, containing lowercase letters and hyphens).
    """
    name = f"projects/{project_id}/iap_tunnel/locations/{location_id}/destGroups/{dest_group_id}"

    try:
        response = client.get_tunnel_dest_group(name=name)
        print(f"Name: {response.name}")
        print(f"CIDRs: {list(response.cidrs)}")
        print(f"FQDNs: {list(response.fqdns)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve tunnel destination group: {e.message}")
# [END iap_v1_identityawareproxyadminservice_tunneldestgroup_get]
