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

# [START privateca_v1_certificateauthorityservice_certificateauthority_delete]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def delete_certificate_authority(
    project_id: str,
    location_id: str,
    ca_pool_id: str,
    certificate_authority_id: str,
) -> None:
    """Deletes a Certificate Authority from a CA pool.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        ca_pool_id: ID of the CA pool (for example, 'example-ca-pool-id').
        certificate_authority_id: ID of the Certificate Authority (for example, 'example-certificate-authority-id').
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"caPools/{ca_pool_id}/certificateAuthorities/{certificate_authority_id}"
    )

    request = privateca_v1.DeleteCertificateAuthorityRequest(
        name=name,
    )

    try:
        operation = client.delete_certificate_authority(request=request)
        response = operation.result()
        print(f"Deleted Certificate Authority: {response.name}")
        print(f"Current state: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END privateca_v1_certificateauthorityservice_certificateauthority_delete]
