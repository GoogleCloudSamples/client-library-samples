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

# [START certificatemanager_v1_certificatemanager_certificatemaps_list]
from google.api_core import exceptions
from google.cloud import certificate_manager_v1


def list_certificate_maps(project_id: str, location_id: str) -> None:
    """Lists certificate maps in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where certificate maps are managed (for example, 'us-central1').
    """
    client = certificate_manager_v1.CertificateManagerClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = certificate_manager_v1.ListCertificateMapsRequest(
            parent=parent,
        )
        page_result = client.list_certificate_maps(request=request)

        for certificate_map in page_result:
            print(f"Certificate map name: {certificate_map.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list certificate maps: {error}")
# [END certificatemanager_v1_certificatemanager_certificatemaps_list]
