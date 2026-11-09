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

# [START networksecurity_v1beta1_networksecurity_clienttlspolicy_create]
from google.api_core import exceptions
from google.cloud import network_security_v1beta1


def create_client_tls_policy(
    project_id: str, location_id: str, client_tls_policy_id: str
) -> None:
    """Creates a ClientTlsPolicy resource in Google Cloud Network Security.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        client_tls_policy_id: ID of the ClientTlsPolicy (for example, 'example-clienttlspolicy-id').
    """
    client = network_security_v1beta1.NetworkSecurityClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    client_tls_policy = network_security_v1beta1.ClientTlsPolicy(
        description="Example Client TLS Policy"
    )

    try:
        operation = client.create_client_tls_policy(
            parent=parent,
            client_tls_policy_id=client_tls_policy_id,
            client_tls_policy=client_tls_policy,
        )
        response = operation.result()
        print(f"Created Client TLS Policy: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to create Client TLS Policy: {error}")
# [END networksecurity_v1beta1_networksecurity_clienttlspolicy_create]
