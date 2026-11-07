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

# [START networksecurity_v1alpha1_networksecurity_clienttlspolicy_create]
from google.api_core import exceptions
from google.cloud import network_security_v1


def create_client_tls_policy(
    project_id: str, location_id: str, client_tls_policy_id: str
) -> None:
    """Creates a client TLS policy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        client_tls_policy_id: Short name of the ClientTlsPolicy resource to be created.
            Must be 1-63 characters long, containing only letters, numbers, hyphens,
            and underscores, and must not start with a number (for example, 'example-client-tls-policy').
    """
    client = network_security_v1.NetworkSecurityClient()

    client_tls_policy = network_security_v1.ClientTlsPolicy(
        description="Example Client TLS Policy",
        sni="example.com",
    )
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        # CreateClientTlsPolicy is a long-running operation; wait for completion.
        operation = client.create_client_tls_policy(
            parent=parent,
            client_tls_policy_id=client_tls_policy_id,
            client_tls_policy=client_tls_policy,
        )
        response = operation.result()
        print(f"Created Client TLS Policy: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to create Client TLS Policy: {e}")
# [END networksecurity_v1alpha1_networksecurity_clienttlspolicy_create]
