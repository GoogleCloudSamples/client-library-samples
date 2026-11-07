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

# [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_policy_get]
import google.api_core.exceptions
from google.cloud import binaryauthorization_v1beta1

client = binaryauthorization_v1beta1.BinauthzManagementServiceV1Beta1Client()


def get_policy(project_id: str) -> None:
    """Get a Binary Authorization policy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    name = f"projects/{project_id}/policy"

    try:
        request = binaryauthorization_v1beta1.GetPolicyRequest(name=name)
        response = client.get_policy(request=request)
        print(f"Policy name: {response.name}")
        print(
            "Default admission rule evaluation mode: "
            f"{response.default_admission_rule.evaluation_mode.name}"
        )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve policy: {e}")
# [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_policy_get]
