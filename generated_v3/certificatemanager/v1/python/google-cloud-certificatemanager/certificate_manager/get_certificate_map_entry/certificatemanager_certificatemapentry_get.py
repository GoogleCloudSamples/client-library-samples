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

# [START certificatemanager_v1_certificatemanager_certificatemapentry_get]
import google.api_core.exceptions
from google.cloud import certificate_manager_v1


def get_certificate_map_entry(
    project_id: str,
    location_id: str,
    certificate_map_id: str,
    certificate_map_entry_id: str,
) -> None:
    """Retrieves a certificate map entry.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        certificate_map_id: ID of the CertificateMap (for example, 'example-certificatemap-id').
        certificate_map_entry_id: ID of the CertificateMapEntry (for example, 'example-certificatemapentry-id').
    """
    client = certificate_manager_v1.CertificateManagerClient()

    name = client.certificate_map_entry_path(
        project_id, location_id, certificate_map_id, certificate_map_entry_id
    )

    request = certificate_manager_v1.GetCertificateMapEntryRequest(
        name=name,
    )

    try:
        response = client.get_certificate_map_entry(request=request)
        print(f"Retrieved certificate map entry: {response.name}")
        print(f"Hostname: {response.hostname}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")


# [END certificatemanager_v1_certificatemanager_certificatemapentry_get]
