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

# [START gkehub_v1_gkehub_membershipbinding_update]
import google.api_core.exceptions
from google.cloud import gkehub_v1
from google.protobuf import field_mask_pb2

client = gkehub_v1.GkeHubClient()


def update_membership_binding(
    project_id: str,
    location_id: str,
    membership_id: str,
    membership_binding_id: str,
) -> None:
    """Use the update_membership_binding method

    Args:
        project_id: The ID of the Google Cloud project.
        location_id: The location of the Membership resource, such as 'global' or a supported Google Cloud region.
        membership_id: The ID of the parent Membership resource.
        membership_binding_id: The client-chosen ID of the MembershipBinding resource to update.
    """
    binding_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"memberships/{membership_id}/bindings/{membership_binding_id}"
    )

    update_mask = field_mask_pb2.FieldMask(paths=["labels"])
    membership_binding = gkehub_v1.MembershipBinding(
        name=binding_name,
        labels={"env": "production"},
    )

    try:
        operation = client.update_membership_binding(
            membership_binding=membership_binding,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated membership binding: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update membership binding: {error}")
# [END gkehub_v1_gkehub_membershipbinding_update]
