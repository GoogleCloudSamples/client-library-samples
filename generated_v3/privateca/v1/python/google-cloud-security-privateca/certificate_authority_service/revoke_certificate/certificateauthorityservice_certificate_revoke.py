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

# [START privateca_v1_certificateauthorityservice_revoke_certificate]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def revoke_certificate(
    project_id: str, location_id: str, ca_pool_id: str, certificate_id: str
) -> None:
    """Revokes an issued certificate.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region of the CA pool.
        ca_pool_id: The ID of the CA pool containing the certificate.
        certificate_id: The ID of the certificate to revoke.
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    name = f"projects/{project_id}/locations/{location_id}/caPools/{ca_pool_id}/certificates/{certificate_id}"
    reason = privateca_v1.RevocationReason.KEY_COMPROMISE

    request = privateca_v1.RevokeCertificateRequest(
        name=name,
        reason=reason,
    )

    try:
        response = client.revoke_certificate(request=request)
        print(f"Revoked certificate: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to revoke certificate: {error}")
# [END privateca_v1_certificateauthorityservice_revoke_certificate]
