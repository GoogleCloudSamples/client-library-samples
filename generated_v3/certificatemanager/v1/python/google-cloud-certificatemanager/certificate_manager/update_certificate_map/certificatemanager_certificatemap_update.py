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

# [START certificatemanager_v1_certificatemanager_certificatemap_update]
from google.api_core import exceptions
from google.cloud import certificate_manager_v1
from google.protobuf import field_mask_pb2


def update_certificate_map(
    project_id: str, location_id: str, certificate_map_id: str
) -> None:
    """Updates an existing certificate map.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
        certificate_map_id: The ID of the CertificateMap to update.
    """
    client = certificate_manager_v1.CertificateManagerClient()

    certificate_map = certificate_manager_v1.CertificateMap(
        name=f"projects/{project_id}/locations/{location_id}/certificateMaps/{certificate_map_id}",
        description="Updated certificate map description",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_certificate_map(
            certificate_map=certificate_map,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated certificate map: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to update certificate map: {error}")
# [END certificatemanager_v1_certificatemanager_certificatemap_update]
