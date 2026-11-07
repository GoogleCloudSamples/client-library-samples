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

# [START networksecurity_v1alpha1_networksecurity_clienttlspolicy_update]
import os

import google.api_core.exceptions
from google.cloud import network_security_v1alpha1
from google.protobuf import field_mask_pb2


def update_client_tls_policy() -> None:
    """Updates a ClientTlsPolicy resource."""
    client = network_security_v1alpha1.NetworkSecurityClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT") or os.environ.get(
        "PROJECT_ID", "example-project-id"
    )
    location = os.environ.get("LOCATION", "global")
    client_tls_policy_id = os.environ.get(
        "CLIENT_TLS_POLICY_ID", "example-client-tls-policy"
    )

    policy_name = (
        f"projects/{project_id}/locations/{location}/clientTlsPolicies/"
        f"{client_tls_policy_id}"
    )

    client_tls_policy = network_security_v1alpha1.ClientTlsPolicy(
        name=policy_name,
        description="Updated client TLS policy description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_client_tls_policy(
            client_tls_policy=client_tls_policy,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated client TLS policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END networksecurity_v1alpha1_networksecurity_clienttlspolicy_update]
