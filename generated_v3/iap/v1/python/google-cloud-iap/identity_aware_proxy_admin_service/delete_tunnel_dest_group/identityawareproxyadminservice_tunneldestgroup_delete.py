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

# [START iap_v1_identityawareproxyadminservice_tunneldestgroup_delete]
import google.api_core.exceptions
from google.cloud import iap_v1

client = iap_v1.IdentityAwareProxyAdminServiceClient()


def delete_tunnel_dest_group(
    location_id: str, project_id: str, dest_group_id: str
) -> None:
    """Use the delete_tunnel_dest_group method

    Args:
        location_id: The Google Cloud region or location for the IAP tunnel (for
          example, 'us-central1' or 'global').
        project_id: The Google Cloud project ID.
        dest_group_id: The ID of the destination group to delete. Must be 4 to
          63 characters and contain only lowercase letters (a-z) and dashes (-).
    """
    name = f"projects/{project_id}/iap_tunnel/locations/{location_id}/destGroups/{dest_group_id}"

    try:
        client.delete_tunnel_dest_group(name=name)
        print(f"Deleted destination group: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to delete destination group: {exc}")


# [END iap_v1_identityawareproxyadminservice_tunneldestgroup_delete]
