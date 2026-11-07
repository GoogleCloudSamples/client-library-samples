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

# [START gkehub_v1beta1_gkehubmembershipservice_membership_create]
import google.api_core.exceptions
from google.cloud import gkehub_v1beta1

client = gkehub_v1beta1.GkeHubMembershipServiceClient()


def create_membership(project_id: str, location_id: str, membership_id: str) -> None:
    """Creates a new fleet membership in GKE Hub.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'global')
        membership_id: ID of the Membership (for example, 'example-membership-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    resource = gkehub_v1beta1.Membership(
        description="Example fleet membership",
    )

    try:
        operation = client.create_membership(
            parent=parent,
            membership_id=membership_id,
            resource=resource,
        )
        response = operation.result()
        print(f"Created membership: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Operation failed: {error}")
# [END gkehub_v1beta1_gkehubmembershipservice_membership_create]
