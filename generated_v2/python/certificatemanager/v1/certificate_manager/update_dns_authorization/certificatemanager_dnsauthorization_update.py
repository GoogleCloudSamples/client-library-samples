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

# [START certificatemanager_v1_certificatemanager_dnsauthorization_update]
import google.api_core.exceptions
from google.cloud import certificate_manager_v1
from google.protobuf import field_mask_pb2


def update_dns_authorization(
    project_id: str, location_id: str, dns_authorization_id: str
) -> None:
    """Updates the description of an existing DNS authorization.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location for the DNS authorization (for example, 'global').
        dns_authorization_id: The identifier of the DNS authorization to update.
    """
    client = certificate_manager_v1.CertificateManagerClient()

    authorization_name = client.dns_authorization_path(
        project_id, location_id, dns_authorization_id
    )

    dns_authorization = certificate_manager_v1.DnsAuthorization(
        name=authorization_name,
        description="Updated description for the DNS authorization",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_dns_authorization(
            dns_authorization=dns_authorization,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated DNS authorization: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update DNS authorization: {e}")
# [END certificatemanager_v1_certificatemanager_dnsauthorization_update]
