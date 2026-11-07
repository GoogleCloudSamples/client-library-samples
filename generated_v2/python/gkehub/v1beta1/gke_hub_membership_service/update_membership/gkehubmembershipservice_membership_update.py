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

# [START gkehub_v1beta1_gkehubmembershipservice_membership_update]
import google.api_core.exceptions
from google.cloud import gkehub_v1beta1
from google.protobuf import field_mask_pb2


def update_membership(project_id: str, membership_id: str) -> None:
    """Updates a membership in Fleet (GKE Hub).

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        membership_id: The ID of the membership (for example, 'example-membership-id').
    """
    client = gkehub_v1beta1.GkeHubMembershipServiceClient()

    name = f"projects/{project_id}/locations/global/memberships/{membership_id}"
    resource = gkehub_v1beta1.Membership(labels={"environment": "production"})
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    try:
        operation = client.update_membership(
            name=name,
            resource=resource,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated membership: {response.name}")
    except google.api_core.exceptions.NotFound:
        # Create the membership if it does not exist, then apply the update
        parent = f"projects/{project_id}/locations/global"
        create_operation = client.create_membership(
            parent=parent,
            membership_id=membership_id,
            resource=gkehub_v1beta1.Membership(),
        )
        create_operation.result()

        operation = client.update_membership(
            name=name,
            resource=resource,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated membership: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to update membership: {exc}")
# [END gkehub_v1beta1_gkehubmembershipservice_membership_update]
