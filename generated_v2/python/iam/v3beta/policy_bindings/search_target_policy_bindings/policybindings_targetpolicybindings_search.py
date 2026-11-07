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

# [START iam_v3beta_policybindings_targetpolicybindings_search]
import google.api_core.exceptions
from google.cloud import iam_v3beta


def search_target_policy_bindings(
    project_id: str, location_id: str, project_number: str
) -> None:
    """Searches policy bindings bound to a specific target resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location for the policy binding search (for example, 'global').
        project_number: The Google Cloud project number of the target resource.
    """
    client = iam_v3beta.PolicyBindingsClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    target = f"//cloudresourcemanager.googleapis.com/projects/{project_number}"

    request = iam_v3beta.SearchTargetPolicyBindingsRequest(
        parent=parent,
        target=target,
    )

    try:
        response = client.search_target_policy_bindings(request=request)
        found = False
        for policy_binding in response:
            found = True
            print(f"Policy binding name: {policy_binding.name}")
            print(f"Target: {policy_binding.target.resource}")
            print(f"Policy: {policy_binding.policy}")
        if not found:
            print(f"No policy bindings found for target: {target}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Search target policy bindings failed: {e.message}")
# [END iam_v3beta_policybindings_targetpolicybindings_search]
