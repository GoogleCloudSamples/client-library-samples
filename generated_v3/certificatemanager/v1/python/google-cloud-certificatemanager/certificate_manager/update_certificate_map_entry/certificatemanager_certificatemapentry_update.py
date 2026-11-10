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

# [START certificatemanager_v1_certificatemanager_certificatemapentry_update]
import google.api_core.exceptions
from google.cloud import certificate_manager_v1
from google.protobuf import field_mask_pb2


def update_certificate_map_entry(
    project_id: str,
    location_id: str,
    certificate_map_id: str,
    certificate_map_entry_id: str,
) -> None:
    """Updates a Certificate Map Entry in Certificate Manager.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, 'global').
        certificate_map_id: The caller-chosen ID of the Certificate Map. Must
          match the regexp '[a-z0-9-]{1,63}'.
        certificate_map_entry_id: The caller-chosen ID of the Certificate Map
          Entry to update. Must match the regexp '[a-z0-9-]{1,63}'.
    """
    client = certificate_manager_v1.CertificateManagerClient()

    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    entry_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"certificateMaps/{certificate_map_id}/"
        f"certificateMapEntries/{certificate_map_entry_id}"
    )
    certificate_map_entry = certificate_manager_v1.CertificateMapEntry(
        name=entry_name,
        description="Updated description",
    )

    try:
        operation = client.update_certificate_map_entry(
            certificate_map_entry=certificate_map_entry,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated certificate map entry: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update certificate map entry: {e}")
# [END certificatemanager_v1_certificatemanager_certificatemapentry_update]
