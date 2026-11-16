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

# [START iap_v1_identityawareproxyadminservice_tunneldestgroup_create]
import google.api_core.exceptions
from google.cloud import iap_v1

client = iap_v1.IdentityAwareProxyAdminServiceClient()


def create_tunnel_dest_group(
    location_id: str, project_id: str, tunnel_dest_group_id: str
) -> None:
    """Create a TunnelDestGroup resource.

    Args:
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        project_id: The Google Cloud project ID.
        tunnel_dest_group_id: The ID to use for the TunnelDestGroup, which
          becomes the final component of the resource name. Must be 4-63
          characters, and valid characters are [a-z]-.
    """
    parent = f"projects/{project_id}/iap_tunnel/locations/{location_id}"
    tunnel_dest_group = iap_v1.TunnelDestGroup(
        cidrs=["10.0.0.1/32"],
        fqdns=["service.example.com"],
    )

    try:
        response = client.create_tunnel_dest_group(
            parent=parent,
            tunnel_dest_group=tunnel_dest_group,
            tunnel_dest_group_id=tunnel_dest_group_id,
        )
        print(f"Created tunnel destination group: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create tunnel destination group: {e.message}")


# [END iap_v1_identityawareproxyadminservice_tunneldestgroup_create]
