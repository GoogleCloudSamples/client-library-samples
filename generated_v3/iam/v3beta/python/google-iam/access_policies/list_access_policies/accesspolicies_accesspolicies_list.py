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

# [START iam_v3beta_accesspolicies_accesspolicies_list]
import google.api_core.exceptions
from google.cloud import iam_v3beta


def list_access_policies(project_id: str, location_id: str) -> None:
    """Lists IAM access policies in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where policies are located (for example, 'global').
    """
    client = iam_v3beta.AccessPoliciesClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = iam_v3beta.ListAccessPoliciesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_access_policies(request=request)
        count = 0
        for policy in page_result:
            print(f"Policy name: {policy.name}")
            count += 1

        if count == 0:
            print(f"No access policies found for parent: {parent}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END iam_v3beta_accesspolicies_accesspolicies_list]
