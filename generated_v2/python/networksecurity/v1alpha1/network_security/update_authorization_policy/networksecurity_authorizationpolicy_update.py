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

# [START networksecurity_v1alpha1_networksecurity_authorizationpolicy_update]
import google.api_core.exceptions
from google.cloud import network_security_v1
from google.protobuf import field_mask_pb2


def update_authorization_policy(
    project_id: str, location_id: str, authorization_policy_id: str
) -> None:
    """Updates an authorization policy.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or 'global' for the authorization
            policy.
        authorization_policy_id: The identifier of the AuthorizationPolicy to
            update. Sourced from an existing AuthorizationPolicy resource.
    """
    client = network_security_v1.NetworkSecurityClient()

    policy_name = (
        f"projects/{project_id}/locations/{location_id}/authorizationPolicies/"
        f"{authorization_policy_id}"
    )

    authorization_policy = network_security_v1.AuthorizationPolicy(
        name=policy_name,
        description="Updated authorization policy description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_authorization_policy(
            authorization_policy=authorization_policy,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated authorization policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END networksecurity_v1alpha1_networksecurity_authorizationpolicy_update]
