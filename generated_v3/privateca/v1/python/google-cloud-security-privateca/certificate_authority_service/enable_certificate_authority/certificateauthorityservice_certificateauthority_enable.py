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

# [START privateca_v1_certificateauthorityservice_enable_certificate_authority]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def enable_certificate_authority(
    project_id: str,
    location_id: str,
    ca_pool_id: str,
    certificate_authority_id: str,
) -> None:
    """Enables a Certificate Authority in the specified CA pool.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the CA Pool and Certificate Authority are located (for example, 'us-central1').
        ca_pool_id: The identifier of the CA Pool (for example, 'example-pool'). Must match regular expression '[a-zA-Z0-9_-]{1,63}'.
        certificate_authority_id: The identifier of the Certificate Authority to enable (for example, 'example-ca'). Must match regular expression '[a-zA-Z0-9_-]{1,63}'.
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/caPools/{ca_pool_id}/"
        f"certificateAuthorities/{certificate_authority_id}"
    )

    request = privateca_v1.EnableCertificateAuthorityRequest(name=name)

    try:
        operation = client.enable_certificate_authority(request=request)
        response = operation.result()
        print(f"Enabled Certificate Authority: {response.name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to enable Certificate Authority: {error}")
# [END privateca_v1_certificateauthorityservice_enable_certificate_authority]
