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

# [START networksecurity_v1alpha1_networksecurity_servertlspolicy_create]
import google.api_core.exceptions
try:
    from google.cloud import network_security_v1
except ImportError:
    try:
        from google.cloud import network_security_v1alpha1 as network_security_v1
    except ImportError:
        from google.cloud import networksecurity_v1 as network_security_v1


def create_server_tls_policy(
    project_id: str, location_id: str, server_tls_policy_id: str
) -> None:
    """Creates a Server TLS policy.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (for example, 'global' or 'us-central1').
        server_tls_policy_id: A user-provided identifier for the ServerTlsPolicy
            (for example, 'sample-server-tls-policy'). Must be 1-63 characters long,
            containing only lowercase letters, numbers, hyphens, and underscores,
            and cannot start with a number.
    """
    client = network_security_v1.NetworkSecurityClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    certificate_provider = network_security_v1.CertificateProvider(
        certificate_provider_instance=network_security_v1.CertificateProviderInstance(
            plugin_instance="google_cloud_private_spiffe"
        )
    )
    server_tls_policy = network_security_v1.ServerTlsPolicy(
        description="Sample Server TLS Policy",
        server_certificate=certificate_provider,
    )

    try:
        operation = client.create_server_tls_policy(
            parent=parent,
            server_tls_policy_id=server_tls_policy_id,
            server_tls_policy=server_tls_policy,
        )
        response = operation.result()
        print(f"Created Server TLS policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create Server TLS policy: {error}")
# [END networksecurity_v1alpha1_networksecurity_servertlspolicy_create]
