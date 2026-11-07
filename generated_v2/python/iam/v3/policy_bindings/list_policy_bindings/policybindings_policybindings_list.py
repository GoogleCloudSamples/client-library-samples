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

# [START iam_v3_policybindings_policybindings_list]
import google.api_core.exceptions
from google.cloud import iam_v3


def list_policy_bindings(project_id: str, location_id: str) -> None:
    """Lists IAM policy bindings in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (for example, 'global').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    client = iam_v3.PolicyBindingsClient()
    request = iam_v3.ListPolicyBindingsRequest(
        parent=parent,
    )

    try:
        response = client.list_policy_bindings(request=request)
        count = 0
        for policy_binding in response:
            count += 1
            print(f"Name: {policy_binding.name}")
            print(f"Policy: {policy_binding.policy}")

        if count == 0:
            print(f"No policy bindings found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END iam_v3_policybindings_policybindings_list]
