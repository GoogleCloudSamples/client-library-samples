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

# [START osconfig_v1alpha_osconfigzonalservice_ospolicyassignments_list]
import google.api_core.exceptions
from google.cloud import osconfig_v1alpha

client = osconfig_v1alpha.OsConfigZonalServiceClient()


def list_os_policy_assignments(project_id: str, location_id: str) -> None:
    """Use the list_os_policy_assignments method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Compute Engine zone (for example, `us-central1-a`) corresponding to the location.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = osconfig_v1alpha.ListOSPolicyAssignmentsRequest(parent=parent)

    try:
        page_result = client.list_os_policy_assignments(request=request)
        for os_policy_assignment in page_result:
            print(f"Name: {os_policy_assignment.name}")
            print(f"Description: {os_policy_assignment.description}")
            print(f"Rollout state: {os_policy_assignment.rollout_state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list OS policy assignments: {error.message}")
# [END osconfig_v1alpha_osconfigzonalservice_ospolicyassignments_list]
