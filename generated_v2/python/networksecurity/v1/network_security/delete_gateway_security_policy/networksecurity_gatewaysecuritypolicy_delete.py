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

# [START networksecurity_v1_networksecurity_gatewaysecuritypolicy_delete]
import google.api_core.exceptions
from google.cloud import network_security_v1


def delete_gateway_security_policy(
    project_id: str, location_id: str, gateway_security_policy_id: str
) -> None:
    """Deletes a gateway security policy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        gateway_security_policy_id: ID of the GatewaySecurityPolicy (for example, 'example-gatewaysecuritypolicy-id').
    """
    client = network_security_v1.NetworkSecurityClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"gatewaySecurityPolicies/{gateway_security_policy_id}"
    )

    request = network_security_v1.DeleteGatewaySecurityPolicyRequest(
        name=name,
    )

    try:
        operation = client.delete_gateway_security_policy(request=request)
        operation.result()
        print(f"Deleted gateway security policy: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete gateway security policy: {error.message}")
# [END networksecurity_v1_networksecurity_gatewaysecuritypolicy_delete]
