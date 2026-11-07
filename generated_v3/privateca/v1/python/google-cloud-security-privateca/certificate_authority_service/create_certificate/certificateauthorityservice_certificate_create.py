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

# [START privateca_v1_certificateauthorityservice_certificate_create]
from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
import google.api_core.exceptions
from google.cloud.security import privateca_v1
from google.protobuf import duration_pb2


def create_certificate(
    project_id: str, location_id: str, ca_pool_id: str, certificate_id: str
) -> None:
    """Create a certificate in a Certificate Authority pool.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        ca_pool_id: ID of the CaPool (for example, 'example-capool-id').
        certificate_id: Caller-specified ID of the Certificate to create (for
          example, 'sample-certificate'). Required when using an Enterprise tier
          CA pool, optional otherwise. Must match '[a-zA-Z0-9_-]{1,63}'.
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    # Generate an RSA private key and sign a Certificate Signing Request (CSR).
    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    csr = (
        x509.CertificateSigningRequestBuilder()
        .subject_name(
            x509.Name(
                [
                    x509.NameAttribute(
                        x509.NameOID.COMMON_NAME, "example.com"
                    ),
                ]
            )
        )
        .sign(key, hashes.SHA256())
    )
    pem_csr = csr.public_bytes(serialization.Encoding.PEM).decode("utf-8")

    certificate = privateca_v1.Certificate(
        lifetime=duration_pb2.Duration(seconds=86400),
        pem_csr=pem_csr,
    )
    parent = f"projects/{project_id}/locations/{location_id}/caPools/{ca_pool_id}"

    try:
        response = client.create_certificate(
            parent=parent,
            certificate_id=certificate_id,
            certificate=certificate,
        )
        print(f"Created certificate: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API error creating certificate: {e}")
    except google.api_core.exceptions.RetryError as e:
        print(f"Retry error creating certificate: {e}")
# [END privateca_v1_certificateauthorityservice_certificate_create]
