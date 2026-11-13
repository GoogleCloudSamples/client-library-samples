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

# [START privateca_v1_certificateauthorityservice_certificateauthority_update]
import google.api_core.exceptions
from google.cloud.security import privateca_v1
from google.protobuf import field_mask_pb2


def update_certificate_authority(
    project_id: str,
    location_id: str,
    ca_pool_id: str,
    certificate_authority_id: str,
) -> None:
    """Updates an existing Certificate Authority.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
        ca_pool_id: The caller-specified ID of the existing CA Pool.
        certificate_authority_id: The caller-specified ID of the existing
            Certificate Authority to update.
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    ca_name = (
        f"projects/{project_id}/locations/{location_id}/caPools/"
        f"{ca_pool_id}/certificateAuthorities/{certificate_authority_id}"
    )

    update_mask = field_mask_pb2.FieldMask(paths=["labels"])
    certificate_authority = privateca_v1.CertificateAuthority(
        name=ca_name,
        labels={"env": "test"},
    )

    request = privateca_v1.UpdateCertificateAuthorityRequest(
        certificate_authority=certificate_authority,
        update_mask=update_mask,
    )

    try:
        operation = client.update_certificate_authority(request=request)
        response = operation.result()
        print(f"Updated certificate authority: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END privateca_v1_certificateauthorityservice_certificateauthority_update]
