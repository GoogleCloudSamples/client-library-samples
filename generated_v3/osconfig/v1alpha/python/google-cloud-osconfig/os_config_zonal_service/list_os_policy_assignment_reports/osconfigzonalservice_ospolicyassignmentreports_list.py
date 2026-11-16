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

# [START osconfig_v1alpha_osconfigzonalservice_ospolicyassignmentreports_list]
import google.api_core.exceptions
from google.cloud import osconfig_v1alpha

client = osconfig_v1alpha.OsConfigZonalServiceClient()


def list_os_policy_assignment_reports(project_id: str, location_id: str) -> None:
    """List OS policy assignment reports in a specified zone.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Compute Engine zone (for example, 'us-central1-a').
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/instances/-"
        "/osPolicyAssignments/-"
    )

    request = osconfig_v1alpha.ListOSPolicyAssignmentReportsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_os_policy_assignment_reports(request=request)
        for report in page_result:
            print(f"Report Name: {report.name}")
            print(f"OS Policy Assignment: {report.os_policy_assignment}")
            print(f"Instance: {report.instance}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list OS policy assignment reports: {e}")
# [END osconfig_v1alpha_osconfigzonalservice_ospolicyassignmentreports_list]
