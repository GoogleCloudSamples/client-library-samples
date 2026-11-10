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

# [START certificatemanager_v1_certificatemanager_certificate_create]
import datetime

from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.x509.oid import NameOID
import google.api_core.exceptions
from google.cloud import certificate_manager_v1


def create_certificate(
    project_id: str, location_id: str, certificate_id: str
) -> None:
    """Create a certificate in Certificate Manager.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'us-central1').
        certificate_id: The certificate identifier (for example, 'example-certificate-id').
    """
    client = certificate_manager_v1.CertificateManagerClient()

    # Generate a self-signed certificate and private key for self-managed certificate creation
    key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
    )
    pem_private_key = key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    ).decode("utf-8")

    now = datetime.datetime.now(datetime.timezone.utc)
    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COMMON_NAME, "example.com"),
    ])
    cert = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(now)
        .not_valid_after(now + datetime.timedelta(days=365))
        .add_extension(
            x509.SubjectAlternativeName([x509.DNSName("example.com")]),
            critical=False,
        )
        .sign(key, hashes.SHA256())
    )
    pem_certificate = cert.public_bytes(serialization.Encoding.PEM).decode("utf-8")

    parent = f"projects/{project_id}/locations/{location_id}"
    certificate = certificate_manager_v1.Certificate(
        description="Example self-managed certificate",
        self_managed=certificate_manager_v1.Certificate.SelfManagedCertificate(
            pem_certificate=pem_certificate,
            pem_private_key=pem_private_key,
        ),
    )

    try:
        operation = client.create_certificate(
            parent=parent,
            certificate_id=certificate_id,
            certificate=certificate,
        )
        response = operation.result()
        print(f"Certificate created: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create certificate: {error}")
# [END certificatemanager_v1_certificatemanager_certificate_create]
