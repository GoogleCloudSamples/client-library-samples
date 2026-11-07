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

# [START networksecurity_v1alpha1_networksecurity_gatewaysecuritypolicyrule_create]
import google.api_core.exceptions
from google.cloud import network_security_v1


def create_gateway_security_policy_rule(
    project_id: str, location_id: str, gateway_security_policy_id: str
) -> None:
    """Creates a gateway security policy rule.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        gateway_security_policy_id: The ID of the GatewaySecurityPolicy (for example, 'example-gatewaysecuritypolicy-id').
    """
    client = network_security_v1.NetworkSecurityClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"gatewaySecurityPolicies/{gateway_security_policy_id}"
    )
    gateway_security_policy_rule = network_security_v1.GatewaySecurityPolicyRule(
        enabled=True,
        priority=1000,
        description="Rule to allow traffic matching basic criteria",
        basic_profile=network_security_v1.GatewaySecurityPolicyRule.BasicProfile.ALLOW,
        session_matcher="host() == 'example.com'",
    )

    try:
        operation = client.create_gateway_security_policy_rule(
            parent=parent,
            gateway_security_policy_rule_id="default-rule",
            gateway_security_policy_rule=gateway_security_policy_rule,
        )
        response = operation.result()
        print(f"Created rule: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create rule: {error}")


# [END networksecurity_v1alpha1_networksecurity_gatewaysecuritypolicyrule_create]
