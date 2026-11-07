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

# [START gkehub_v1beta1_gkehubmembershipservice_validate_exclusivity]
import google.api_core.exceptions
from google.cloud import gkehub_v1beta1

client = gkehub_v1beta1.GkeHubMembershipServiceClient()


def validate_exclusivity(project_id: str, location_id: str) -> None:
    """Use the validate_exclusivity method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    intended_membership = "example-intended-membership"

    request = gkehub_v1beta1.ValidateExclusivityRequest(
        parent=parent,
        intended_membership=intended_membership,
    )

    try:
        response = client.validate_exclusivity(request=request)
        print(f"Validation status code: {response.status.code}")
        print(f"Validation status message: {response.status.message}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to validate exclusivity: {error}")
# [END gkehub_v1beta1_gkehubmembershipservice_validate_exclusivity]
