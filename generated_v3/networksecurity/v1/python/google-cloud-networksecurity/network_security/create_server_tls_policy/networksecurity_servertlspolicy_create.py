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

# [START networksecurity_v1_networksecurity_servertlspolicy_create]
import google.api_core.exceptions
from google.cloud import network_security_v1


def create_server_tls_policy(
    project_id: str, location_id: str, server_tls_policy_id: str
) -> None:
    """Creates a Server TLS policy in the specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        server_tls_policy_id: ID of the ServerTlsPolicy (for example, 'example-servertlspolicy-id').
    """
    client = network_security_v1.NetworkSecurityClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    server_tls_policy = network_security_v1.ServerTlsPolicy(
        description="Example Server TLS Policy",
        allow_open=False,
        server_certificate=network_security_v1.CertificateProvider(
            certificate_provider_instance=network_security_v1.CertificateProviderInstance(
                plugin_instance="google_cloud_private_spiffe"
            )
        ),
    )

    request = network_security_v1.CreateServerTlsPolicyRequest(
        parent=parent,
        server_tls_policy_id=server_tls_policy_id,
        server_tls_policy=server_tls_policy,
    )

    try:
        operation = client.create_server_tls_policy(request=request)
        response = operation.result()
        print(f"Created Server TLS policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error creating Server TLS policy: {e}")
# [END networksecurity_v1_networksecurity_servertlspolicy_create]
