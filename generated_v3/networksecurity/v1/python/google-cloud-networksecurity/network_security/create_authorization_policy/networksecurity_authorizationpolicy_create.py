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

# [START networksecurity_v1_networksecurity_authorizationpolicy_create]
import google.api_core.exceptions
from google.cloud import network_security_v1


def create_authorization_policy(
    project_id: str, location_id: str, authorization_policy_id: str
) -> None:
    """Create an authorization policy in a project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        authorization_policy_id: ID of the AuthorizationPolicy (for example, 'example-authorizationpolicy-id').
    """
    client = network_security_v1.NetworkSecurityClient()

    authorization_policy = network_security_v1.AuthorizationPolicy(
        action=network_security_v1.AuthorizationPolicy.Action.ALLOW,
        description="Example authorization policy",
    )
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        operation = client.create_authorization_policy(
            parent=parent,
            authorization_policy_id=authorization_policy_id,
            authorization_policy=authorization_policy,
        )
        response = operation.result()
        print(f"Created authorization policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create authorization policy: {error}")
# [END networksecurity_v1_networksecurity_authorizationpolicy_create]
