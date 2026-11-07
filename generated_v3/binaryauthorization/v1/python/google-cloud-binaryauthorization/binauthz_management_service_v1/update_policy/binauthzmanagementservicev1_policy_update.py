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

# [START binaryauthorization_v1_binauthzmanagementservicev1_policy_update]
import google.api_core.exceptions
from google.cloud import binaryauthorization_v1

client = binaryauthorization_v1.BinauthzManagementServiceV1Client()


def update_policy(project_id: str) -> None:
    """Use the update_policy method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    policy = binaryauthorization_v1.Policy(
        name=f"projects/{project_id}/policy",
        description="Updated production policy",
        default_admission_rule=binaryauthorization_v1.AdmissionRule(
            evaluation_mode=binaryauthorization_v1.AdmissionRule.EvaluationMode.ALWAYS_ALLOW,
            enforcement_mode=binaryauthorization_v1.AdmissionRule.EnforcementMode.ENFORCED_BLOCK_AND_AUDIT_LOG,
        ),
    )

    try:
        response = client.update_policy(policy=policy)
        print(f"Policy updated: {response.name}")
        print(f"Default evaluation mode: {response.default_admission_rule.evaluation_mode.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update policy: {e}")
# [END binaryauthorization_v1_binauthzmanagementservicev1_policy_update]
