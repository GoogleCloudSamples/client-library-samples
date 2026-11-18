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

# [START managedidentities_v1_managedidentitiesservice_attach_trust]
import google.api_core.exceptions
from google.cloud import managedidentities_v1


def attach_trust(project_id: str, location_id: str, domain_id: str) -> None:
    """Attaches an Active Directory trust to a Managed Microsoft AD domain.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location for the domain (for example, 'global').
        domain_id: The unique domain identifier (for example, 'example.com').
    """
    client = managedidentities_v1.ManagedIdentitiesServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/domains/{domain_id}"
    trust = managedidentities_v1.Trust(
        target_domain_name="target.example.com",
        trust_type=managedidentities_v1.Trust.TrustType.FOREST,
        trust_direction=managedidentities_v1.Trust.TrustDirection.BIDIRECTIONAL,
        target_dns_ip_addresses=["10.0.0.1"],
        trust_handshake_secret="example-trust-secret",
    )

    request = managedidentities_v1.AttachTrustRequest(
        name=name,
        trust=trust,
    )

    try:
        operation = client.attach_trust(request=request)
        print(f"Attach trust operation initiated: {operation.operation.name}")
        # AttachTrust is a long-running operation. In an environment with network
        # connectivity to a live target domain, wait for completion using:
        # response = operation.result()
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to initiate attach trust: {error.message}")
# [END managedidentities_v1_managedidentitiesservice_attach_trust]
