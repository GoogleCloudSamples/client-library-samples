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

# [START certificatemanager_v1_certificatemanager_certificatemapentry_create]
import google.api_core.exceptions
from google.cloud import certificate_manager_v1


def create_certificate_map_entry(
    project_id: str,
    location_id: str,
    certificate_map_id: str,
    certificate_map_entry_id: str,
    certificate_id: str,
) -> None:
    """Create a certificate map entry in Certificate Manager.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the resource is located (for example, 'global').
        certificate_map_id: The ID of the existing CertificateMap (for example, 'example-certificatemap-id').
        certificate_map_entry_id: The user-provided ID of the CertificateMapEntry to create (for example, 'example-certificatemapentry-id').
        certificate_id: The ID of an existing Certificate to attach (for example, 'sample-certificate').
    """
    client = certificate_manager_v1.CertificateManagerClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/certificateMaps/{certificate_map_id}"
    )
    certificate_name = (
        f"projects/{project_id}/locations/{location_id}/certificates/{certificate_id}"
    )

    certificate_map_entry = certificate_manager_v1.CertificateMapEntry(
        hostname="test.example.com",
        description="Sample Certificate Map Entry",
        certificates=[certificate_name],
    )

    try:
        operation = client.create_certificate_map_entry(
            parent=parent,
            certificate_map_entry_id=certificate_map_entry_id,
            certificate_map_entry=certificate_map_entry,
        )
        response = operation.result()
        print(f"Created certificate map entry: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END certificatemanager_v1_certificatemanager_certificatemapentry_create]
