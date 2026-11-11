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

# [START iam_v3_accesspolicies_accesspolicies_list]
import google.api_core.exceptions
from google.cloud import iam_v3


def list_access_policies(project_id: str, location_id: str) -> None:
    """List IAM access policies for a project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (for example, 'global').
    """
    client = iam_v3.AccessPoliciesClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = iam_v3.ListAccessPoliciesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_access_policies(request=request)
        count = 0
        for access_policy in page_result:
            print(f"Access Policy: {access_policy.name}")
            print(f"Display Name: {access_policy.display_name}")
            count += 1

        if count == 0:
            print("No access policies found.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list access policies: {e}")
# [END iam_v3_accesspolicies_accesspolicies_list]
