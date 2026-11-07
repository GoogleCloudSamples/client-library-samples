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

# [START certificatemanager_v1_certificatemanager_dnsauthorization_get]
from google.api_core import exceptions
from google.cloud import certificate_manager_v1


def get_dns_authorization(
    project_id: str, location_id: str, dns_authorization_id: str
) -> None:
    """Gets a DNS authorization.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        dns_authorization_id: The ID of the DNS authorization (for example, 'example-dnsauthorization-id').
    """
    client = certificate_manager_v1.CertificateManagerClient()

    name = f"projects/{project_id}/locations/{location_id}/dnsAuthorizations/{dns_authorization_id}"

    try:
        response = client.get_dns_authorization(name=name)
        print(f"Retrieved DNS Authorization: {response.name}")
        print(f"Domain: {response.domain}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve DNS authorization: {error}")
# [END certificatemanager_v1_certificatemanager_dnsauthorization_get]
