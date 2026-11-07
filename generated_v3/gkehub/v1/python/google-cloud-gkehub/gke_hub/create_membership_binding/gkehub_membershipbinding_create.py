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

# [START gkehub_v1_gkehub_membershipbinding_create]
import google.api_core.exceptions
from google.cloud import gkehub_v1

client = gkehub_v1.GkeHubClient()


def create_membership_binding(
    project_id: str,
    location_id: str,
    membership_id: str,
    membership_binding_id: str,
    scope_id: str,
) -> None:
    """Use the create_membership_binding method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (region or 'global') where the Membership is registered (for example, 'global' or 'us-central1').
        membership_id: The client-assigned ID of the parent Membership (for example, 'example-membership-id').
        membership_binding_id: A caller-chosen ID for the MembershipBinding (for example, 'example-binding-id'). Use lowercase letters, numbers, and hyphens.
        scope_id: The client-assigned or existing ID of the Scope to bind to the Membership (for example, 'example-scope-id').
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/memberships/{membership_id}"
    )
    membership_binding = gkehub_v1.MembershipBinding(
        scope=f"projects/{project_id}/locations/{location_id}/scopes/{scope_id}"
    )

    try:
        operation = client.create_membership_binding(
            parent=parent,
            membership_binding_id=membership_binding_id,
            membership_binding=membership_binding,
        )
        response = operation.result()
        print(f"Created membership binding: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create membership binding: {error}")
# [END gkehub_v1_gkehub_membershipbinding_create]
