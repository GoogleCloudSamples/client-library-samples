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

# [START iap_v1_identityawareproxyadminservice_tunneldestgroups_list]
import google.api_core.exceptions
from google.cloud import iap_v1

client = iap_v1.IdentityAwareProxyAdminServiceClient()


def list_tunnel_dest_groups(location_id: str, project_id: str) -> None:
    """Lists Identity-Aware Proxy tunnel destination groups in a project and location.

    Args:
        location_id: The Google Cloud location or region (for example,
            'us-central1'), or '-' to list destination groups across all
            locations.
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}/iap_tunnel/locations/{location_id}"

    request = iap_v1.ListTunnelDestGroupsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_tunnel_dest_groups(request=request)
        for dest_group in page_result:
            print(f"Destination group name: {dest_group.name}")
            print(f"CIDRs: {dest_group.cidrs}")
            print(f"FQDNs: {dest_group.fqdns}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END iap_v1_identityawareproxyadminservice_tunneldestgroups_list]
