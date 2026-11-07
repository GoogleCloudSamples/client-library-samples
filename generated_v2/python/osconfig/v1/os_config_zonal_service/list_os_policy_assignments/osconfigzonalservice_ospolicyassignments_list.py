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

# [START osconfig_v1_osconfigzonalservice_ospolicyassignments_list]
import google.api_core.exceptions
from google.cloud import osconfig_v1

client = osconfig_v1.OsConfigZonalServiceClient()


def list_os_policy_assignments(project_id: str, location_id: str) -> None:
    """Lists OS policy assignments in a specified Google Cloud project and zone.

    Args:
        project_id: The Google Cloud project ID hosting the OS policy assignments.
        location_id: The Compute Engine zone (for example, 'us-central1-a') managing the OS policy assignments.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        response = client.list_os_policy_assignments(parent=parent)
        for assignment in response:
            print(f"OS Policy Assignment: {assignment.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list OS policy assignments: {error}")
# [END osconfig_v1_osconfigzonalservice_ospolicyassignments_list]
