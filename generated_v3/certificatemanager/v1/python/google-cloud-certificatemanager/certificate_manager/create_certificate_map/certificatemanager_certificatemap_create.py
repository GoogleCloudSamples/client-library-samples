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

# [START certificatemanager_v1_certificatemanager_certificatemap_create]
import google.api_core.exceptions
from google.cloud import certificate_manager_v1


def create_certificate_map(
    project_id: str, location_id: str, certificate_map_id: str
) -> None:
    """Creates a certificate map.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud region where the service is located (for example, 'global').
        certificate_map_id: ID of the certificate map (for example, 'example-certificatemap-id').
    """
    client = certificate_manager_v1.CertificateManagerClient()

    # Certificate maps are supported only in the 'global' location.
    location_id = "global"
    parent = f"projects/{project_id}/locations/{location_id}"
    certificate_map = certificate_manager_v1.CertificateMap(
        description="Example certificate map",
        labels={"environment": "test"},
    )

    try:
        operation = client.create_certificate_map(
            parent=parent,
            certificate_map_id=certificate_map_id,
            certificate_map=certificate_map,
        )
        response = operation.result()
        print(f"Created certificate map: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create certificate map: {error}")


# [END certificatemanager_v1_certificatemanager_certificatemap_create]
