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

# [START iap_v1_identityawareproxyadminservice_tunneldestgroup_update]
import google.api_core.exceptions
from google.cloud import iap_v1
from google.protobuf import field_mask_pb2

client = iap_v1.IdentityAwareProxyAdminServiceClient()


def update_tunnel_dest_group(
    project_id: str, location_id: str, dest_group_id: str
) -> None:
    """Updates a TunnelDestGroup destination CIDR ranges.

    Args:
        project_id: The Google Cloud project ID containing the TunnelDestGroup.
        location_id: The Google Cloud region or location for the TunnelDestGroup
          (for example, 'us-central1' or 'global').
        dest_group_id: The caller-chosen identifier of an existing
          TunnelDestGroup. Must be 4-63 characters containing only lowercase
          letters and dashes.
    """
    tunnel_dest_group = iap_v1.TunnelDestGroup(
        name=f"projects/{project_id}/iap_tunnel/locations/{location_id}/destGroups/{dest_group_id}",
        cidrs=["10.0.0.1/32"],
    )
    update_mask = field_mask_pb2.FieldMask(paths=["cidrs"])

    try:
        response = client.update_tunnel_dest_group(
            tunnel_dest_group=tunnel_dest_group,
            update_mask=update_mask,
        )
        print(f"Updated tunnel destination group: {response.name}")
        print(f"Destination CIDR ranges: {list(response.cidrs)}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to update tunnel destination group: {exc}")


# [END iap_v1_identityawareproxyadminservice_tunneldestgroup_update]
