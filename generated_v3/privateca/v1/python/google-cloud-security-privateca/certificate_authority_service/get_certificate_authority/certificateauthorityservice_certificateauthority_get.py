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

# [START privateca_v1_certificateauthorityservice_certificateauthority_get]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def get_certificate_authority(
    project_id: str,
    location_id: str,
    ca_pool_id: str,
    certificate_authority_id: str,
) -> None:
    """Retrieves details of a Certificate Authority.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the CA pool and Certificate
          Authority reside (for example, 'us-central1').
        ca_pool_id: The identifier of the CA pool containing the Certificate
          Authority.
        certificate_authority_id: The identifier of the Certificate Authority to
          retrieve.
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/caPools/{ca_pool_id}/certificateAuthorities/{certificate_authority_id}"
    )

    request = privateca_v1.GetCertificateAuthorityRequest(
        name=name,
    )

    try:
        ca = client.get_certificate_authority(request=request)
        print(f"Retrieved Certificate Authority: {ca.name}")
        print(f"State: {ca.state.name}")
        print(f"Type: {ca.type_.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END privateca_v1_certificateauthorityservice_certificateauthority_get]
