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

# [START networksecurity_delete_authorization_policy]
import google.api_core.exceptions
from google.cloud import network_security_v1


def delete_authorization_policy(
    project_id: str, location_id: str, authorization_policy_id: str
) -> None:
    """Deletes an authorization policy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'us-central1').
        authorization_policy_id: The authorization policy ID (for example, 'example-policy-id').
    """
    client = network_security_v1.NetworkSecurityClient()

    name = client.authorization_policy_path(
        project_id, location_id, authorization_policy_id
    )

    request = network_security_v1.DeleteAuthorizationPolicyRequest(
        name=name,
    )

    try:
        operation = client.delete_authorization_policy(request=request)
        print("Waiting for operation to complete...")
        operation.result()
        print(f"Deleted authorization policy: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END networksecurity_delete_authorization_policy]
