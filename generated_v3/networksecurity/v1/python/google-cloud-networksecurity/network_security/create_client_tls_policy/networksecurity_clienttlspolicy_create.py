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

# [START networksecurity_v1_networksecurity_clienttlspolicy_create]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import network_security_v1


def create_client_tls_policy(
    project_id: str, location_id: str, client_tls_policy_id: str
) -> None:
    """Creates a ClientTlsPolicy resource in a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location for the client TLS policy (for example, 'global' or 'us-central1').
        client_tls_policy_id: Caller-chosen short name for the ClientTlsPolicy resource. Must be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, starting with a letter (for example, 'client_mtls_policy').
    """
    client = network_security_v1.NetworkSecurityClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    client_tls_policy = network_security_v1.ClientTlsPolicy(
        description="Sample Client TLS policy for service authentication"
    )

    try:
        operation = client.create_client_tls_policy(
            parent=parent,
            client_tls_policy_id=client_tls_policy_id,
            client_tls_policy=client_tls_policy,
        )
        response = operation.result()
        print(f"Created client TLS policy: {response.name}")
    except GoogleAPICallError as error:
        print(f"Failed to create client TLS policy: {error}")
# [END networksecurity_v1_networksecurity_clienttlspolicy_create]
