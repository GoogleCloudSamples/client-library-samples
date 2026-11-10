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

# [START certificatemanager_v1_certificatemanager_dnsauthorization_create]
import google.api_core.exceptions
from google.cloud import certificate_manager_v1


def create_dns_authorization(
    project_id: str, location_id: str, dns_authorization_id: str
) -> None:
    """Create a DNS authorization.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        dns_authorization_id: ID of the DNS authorization (for example, 'example-dns-authorization-id').
    """
    client = certificate_manager_v1.CertificateManagerClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    dns_authorization = certificate_manager_v1.DnsAuthorization(
        domain="example.com",
        description="An example DNS authorization",
    )

    try:
        operation = client.create_dns_authorization(
            parent=parent,
            dns_authorization_id=dns_authorization_id,
            dns_authorization=dns_authorization,
        )
        response = operation.result()
        print(f"Created DNS authorization: {response.name}")
        print(f"Domain: {response.domain}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END certificatemanager_v1_certificatemanager_dnsauthorization_create]
