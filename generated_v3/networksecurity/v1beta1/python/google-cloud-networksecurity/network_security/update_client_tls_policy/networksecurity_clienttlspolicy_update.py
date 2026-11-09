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

# [START networksecurity_v1beta1_networksecurity_clienttlspolicy_update]
from google.api_core import exceptions
from google.cloud import network_security_v1beta1
from google.protobuf import field_mask_pb2


def update_client_tls_policy(
    project_id: str, location_id: str, client_tls_policy_id: str
) -> None:
    """Updates the description of an existing ClientTlsPolicy resource.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location (region or 'global') of the ClientTlsPolicy.
        client_tls_policy_id: The identifier of the existing ClientTlsPolicy resource.
    """
    client = network_security_v1beta1.NetworkSecurityClient()

    policy_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"clientTlsPolicies/{client_tls_policy_id}"
    )

    client_tls_policy = network_security_v1beta1.ClientTlsPolicy(
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
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to update client TLS policy: {error}")
# [END networksecurity_v1beta1_networksecurity_clienttlspolicy_update]
