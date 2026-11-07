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

# [START networksecurity_create_gateway_security_policy]
from google.api_core import exceptions
from google.cloud import network_security_v1


def create_gateway_security_policy(
    project_id: str, location_id: str, gateway_security_policy_id: str
) -> None:
    """Creates a Gateway Security Policy resource in Network Security.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region.
        gateway_security_policy_id: The ID for the Gateway Security Policy.
    """
    client = network_security_v1.NetworkSecurityClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    gateway_security_policy = network_security_v1.GatewaySecurityPolicy(
        description="Example Gateway Security Policy"
    )

    request = network_security_v1.CreateGatewaySecurityPolicyRequest(
        parent=parent,
        gateway_security_policy_id=gateway_security_policy_id,
        gateway_security_policy=gateway_security_policy,
    )

    try:
        operation = client.create_gateway_security_policy(request=request)
        response = operation.result()
        print(f"Created Gateway Security Policy: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to create Gateway Security Policy: {error}")


# [END networksecurity_create_gateway_security_policy]
