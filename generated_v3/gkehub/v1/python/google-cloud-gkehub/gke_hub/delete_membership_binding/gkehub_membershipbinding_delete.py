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

# [START gkehub_v1_gkehub_membershipbinding_delete]
import google.api_core.exceptions
from google.cloud import gkehub_v1

client = gkehub_v1.GkeHubClient()


def delete_membership_binding(
    project_id: str, location_id: str, membership_id: str, binding_id: str
) -> None:
    """Deletes a membership binding in GKE Hub.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        membership_id: ID of the Membership (for example, 'example-membership-id')
        binding_id: ID of the Binding (for example, 'example-binding-id')
    """
    name = f"projects/{project_id}/locations/{location_id}/memberships/{membership_id}/bindings/{binding_id}"

    request = gkehub_v1.DeleteMembershipBindingRequest(name=name)

    try:
        operation = client.delete_membership_binding(request=request)
        operation.result()
        print(f"Deleted membership binding: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Membership binding not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete membership binding: {error}")
# [END gkehub_v1_gkehub_membershipbinding_delete]
