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

# [START privateca_v1_certificateauthorityservice_certificates_list]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def list_certificates(project_id: str, location_id: str, ca_pool_id: str) -> None:
    """Lists certificates in the specified Certificate Authority pool.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        ca_pool_id: The ID of the CA pool, or '-' to list certificates across all CA pools in the location.
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/caPools/{ca_pool_id}"

    request = privateca_v1.ListCertificatesRequest(
        parent=parent,
    )

    try:
        response = client.list_certificates(request=request)
        print(f"Certificates in {parent}:")
        has_certificates = False
        for certificate in response:
            print(f"- {certificate.name}")
            has_certificates = True
        if not has_certificates:
            print("No certificates found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list certificates: {error}")
# [END privateca_v1_certificateauthorityservice_certificates_list]
