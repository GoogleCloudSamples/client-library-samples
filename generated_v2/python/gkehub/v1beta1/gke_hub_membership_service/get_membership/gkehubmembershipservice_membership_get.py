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

# [START gkehub_v1beta1_gkehubmembershipservice_membership_get]
import google.api_core.exceptions
from google.cloud import gkehub_v1beta1

client = gkehub_v1beta1.GkeHubMembershipServiceClient()


def get_membership(project_id: str, location_id: str, membership_id: str) -> None:
    """Retrieves an existing membership in Google Kubernetes Engine Hub.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or 'global' where the membership is located (for example, 'global' or 'us-central1').
        membership_id: The client-assigned ID of the existing Membership (for example, 'example-membership').
    """
    name = f"projects/{project_id}/locations/{location_id}/memberships/{membership_id}"

    try:
        response = client.get_membership(name=name)
        print(f"Membership name: {response.name}")
        print(f"Unique identifier: {response.unique_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END gkehub_v1beta1_gkehubmembershipservice_membership_get]
