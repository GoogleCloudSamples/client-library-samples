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

# [START network_security_get_gateway_security_policy]
import google.api_core.exceptions
from google.cloud import network_security_v1


def get_gateway_security_policy(
    project_id: str, location_id: str, gateway_security_policy_id: str
) -> None:
    """Gets a gateway security policy.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID.
        gateway_security_policy_id: The gateway security policy ID.
    """
    client = network_security_v1.NetworkSecurityClient()

    name = client.gateway_security_policy_path(
        project_id, location_id, gateway_security_policy_id
    )

    request = network_security_v1.GetGatewaySecurityPolicyRequest(
        name=name,
    )

    try:
        response = client.get_gateway_security_policy(request=request)
        print(f"Gateway security policy name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error fetching gateway security policy: {error}")


# [END network_security_get_gateway_security_policy]
