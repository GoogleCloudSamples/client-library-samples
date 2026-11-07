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

# [START privateca_v1_certificateauthorityservice_certificateauthority_create]
import google.api_core.exceptions
from google.cloud.security import privateca_v1
from google.protobuf import duration_pb2


def create_certificate_authority(
    project_id: str,
    location_id: str,
    ca_pool_id: str,
    certificate_authority_id: str,
) -> None:
    """Create a certificate authority in a CA pool.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        ca_pool_id: ID of the CaPool (for example, 'example-capool-id').
        certificate_authority_id: ID of the CertificateAuthority (for example, 'example-certificateauthority-id').
    """
    client = privateca_v1.CertificateAuthorityServiceClient()
    parent = client.ca_pool_path(project_id, location_id, ca_pool_id)

    # Configure the certificate authority subject and x509 properties
    subject = privateca_v1.Subject(
        common_name="Example Root CA",
        organization="Example Organization",
    )
    subject_config = privateca_v1.CertificateConfig.SubjectConfig(
        subject=subject,
    )

    ca_options = privateca_v1.X509Parameters.CaOptions(
        is_ca=True,
        max_issuer_path_length=1,
    )
    key_usage = privateca_v1.KeyUsage(
        base_key_usage=privateca_v1.KeyUsage.KeyUsageOptions(
            cert_sign=True,
            crl_sign=True,
        )
    )
    x509_config = privateca_v1.X509Parameters(
        ca_options=ca_options,
        key_usage=key_usage,
    )

    ca_config = privateca_v1.CertificateConfig(
        subject_config=subject_config,
        x509_config=x509_config,
    )

    key_spec = privateca_v1.CertificateAuthority.KeyVersionSpec(
        algorithm=privateca_v1.CertificateAuthority.SignHashAlgorithm.RSA_PKCS1_4096_SHA256,
    )

    certificate_authority = privateca_v1.CertificateAuthority(
        type_=privateca_v1.CertificateAuthority.Type.SELF_SIGNED,
        config=ca_config,
        lifetime=duration_pb2.Duration(seconds=315360000),
        key_spec=key_spec,
    )

    try:
        request = privateca_v1.CreateCertificateAuthorityRequest(
            parent=parent,
            certificate_authority_id=certificate_authority_id,
            certificate_authority=certificate_authority,
        )
        operation = client.create_certificate_authority(request=request)
        response = operation.result()
        print(f"Created Certificate Authority: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create certificate authority: {e}")
# [END privateca_v1_certificateauthorityservice_certificateauthority_create]
