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

# [START networksecurity_v1beta1_networksecurity_authorizationpolicy_get]
from google.api_core import exceptions
from google.cloud import network_security_v1


def get_authorization_policy(
    project_id: str, location_id: str, authorization_policy_id: str
) -> None:
    """Retrieves an AuthorizationPolicy resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        authorization_policy_id: ID of the AuthorizationPolicy (for example, 'example-authorization-policy-id').
    """
    client = network_security_v1.NetworkSecurityClient()
    name = f"projects/{project_id}/locations/{location_id}/authorizationPolicies/{authorization_policy_id}"

    try:
        response = client.get_authorization_policy(name=name)
        print(f"Authorization policy name: {response.name}")
        print(f"Action: {response.action}")
        print(f"Create time: {response.create_time}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve authorization policy: {e}")
# [END networksecurity_v1beta1_networksecurity_authorizationpolicy_get]
