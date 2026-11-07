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

# [START gkehub_v1_gkehub_membershiprbacrolebindings_list]
import google.api_core.exceptions
from google.cloud import gkehub_v1


def list_membership_rbac_role_bindings(
    project_id: str, location_id: str, membership_id: str
) -> None:
    """List Membership RBAC Role Bindings for a given membership.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        membership_id: ID of the Membership (for example, 'example-membership-id')
    """
    client = gkehub_v1.GkeHubClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/memberships/{membership_id}"
    )

    request = gkehub_v1.ListMembershipRBACRoleBindingsRequest(
        parent=parent,
    )

    try:
        response = client.list_membership_rbac_role_bindings(request=request)
        print(f"Listed RBAC role bindings for membership {membership_id}:")
        count = 0
        for binding in response:
            print(f"Role binding: {binding.name}")
            count += 1
        if count == 0:
            print("No RBAC role bindings found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END gkehub_v1_gkehub_membershiprbacrolebindings_list]
