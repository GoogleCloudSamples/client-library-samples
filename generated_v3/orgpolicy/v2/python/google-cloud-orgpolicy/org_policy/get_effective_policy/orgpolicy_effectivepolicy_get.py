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

# [START orgpolicy_v2_orgpolicy_effectivepolicy_get]
import google.api_core.exceptions
from google.cloud import orgpolicy_v2

client = orgpolicy_v2.OrgPolicyClient()


def get_effective_policy(project_id: str, policy_id: str) -> None:
    """Retrieve the effective organization policy for a project.

    Args:
        project_id: The Google Cloud project ID.
        policy_id: The constraint or policy identifier to evaluate (for example,
          'compute.disableSerialPortAccess').
    """
    name = f"projects/{project_id}/policies/{policy_id}"
    request = orgpolicy_v2.GetEffectivePolicyRequest(name=name)

    try:
        response = client.get_effective_policy(request=request)
        print(f"Retrieved effective policy: {response.name}")
        print(f"Policy rules: {response.spec.rules}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve effective policy: {error.message}")
# [END orgpolicy_v2_orgpolicy_effectivepolicy_get]
