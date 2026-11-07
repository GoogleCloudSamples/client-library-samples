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

# [START certificatemanager_v1_certificatemanager_certificate_get]
import google.api_core.exceptions
from google.cloud import certificate_manager_v1


def get_certificate(project_id: str, location_id: str, certificate_id: str) -> None:
    """Gets details of a Certificate.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        certificate_id: ID of the Certificate (for example, 'example-certificate-id').
    """
    client = certificate_manager_v1.CertificateManagerClient()

    name = f"projects/{project_id}/locations/{location_id}/certificates/{certificate_id}"

    try:
        response = client.get_certificate(name=name)
        print(f"Certificate Name: {response.name}")
        print(f"SAN DNS Names: {response.san_dnsnames}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END certificatemanager_v1_certificatemanager_certificate_get]
