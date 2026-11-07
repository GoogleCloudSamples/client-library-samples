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

# [START certificatemanager_v1_certificatemanager_dnsauthorizations_list]
import google.api_core.exceptions
from google.cloud import certificate_manager_v1


def list_dns_authorizations(project_id: str, location_id: str) -> None:
    """Lists DNS authorizations in a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (for example, 'global' or 'us-central1').
    """
    client = certificate_manager_v1.CertificateManagerClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = certificate_manager_v1.ListDnsAuthorizationsRequest(
        parent=parent,
    )

    try:
        response = client.list_dns_authorizations(request=request)
        for dns_authorization in response:
            print(f"Name: {dns_authorization.name}")
            print(f"Domain: {dns_authorization.domain}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list DNS authorizations: {error}")
# [END certificatemanager_v1_certificatemanager_dnsauthorizations_list]
