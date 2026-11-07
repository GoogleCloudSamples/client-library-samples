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

# [START osconfig_v1alpha_osconfigzonalservice_ospolicyassignment_get]
import google.api_core.exceptions
from google.cloud import osconfig_v1alpha

client = osconfig_v1alpha.OsConfigZonalServiceClient()


def get_os_policy_assignment(
    project_id: str, location_id: str, os_policy_assignment_id: str
) -> None:
    """Use the get_os_policy_assignment method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud zone where the OS policy assignment is
          located (for example, 'us-central1-a').
        os_policy_assignment_id: The logical ID of the OS policy assignment.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"osPolicyAssignments/{os_policy_assignment_id}"
    )

    request = osconfig_v1alpha.GetOSPolicyAssignmentRequest(name=name)

    try:
        response = client.get_os_policy_assignment(request=request)
        print(f"Retrieved OS policy assignment: {response.name}")
        print(f"Rollout state: {response.rollout_state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error.message}")
# [END osconfig_v1alpha_osconfigzonalservice_ospolicyassignment_get]
