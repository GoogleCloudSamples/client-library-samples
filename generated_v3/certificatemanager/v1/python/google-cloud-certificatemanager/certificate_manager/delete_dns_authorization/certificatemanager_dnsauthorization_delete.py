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

# [START certificatemanager_v1_certificatemanager_dnsauthorization_delete]
import google.api_core.exceptions
from google.cloud import certificate_manager_v1


def delete_dns_authorization(
    project_id: str, location_id: str, dns_authorization_id: str
) -> None:
    """Deletes a DNS authorization.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the DNS authorization is deployed (for example, 'global' or 'us-central1').
        dns_authorization_id: The identifier of the existing DNS authorization to delete (for example, 'example-dns-auth').
    """
    client = certificate_manager_v1.CertificateManagerClient()

    name = f"projects/{project_id}/locations/{location_id}/dnsAuthorizations/{dns_authorization_id}"

    try:
        # DeleteDnsAuthorization initiates a long-running operation
        operation = client.delete_dns_authorization(name=name)
        print(f"Waiting for operation {operation.operation.name} to complete...")

        operation.result()
        print(f"Deleted DNS authorization: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Deletion failed: {e}")


# [END certificatemanager_v1_certificatemanager_dnsauthorization_delete]
