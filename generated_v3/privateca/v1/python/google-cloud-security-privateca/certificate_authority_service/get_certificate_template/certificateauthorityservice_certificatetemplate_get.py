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

# [START privateca_v1_certificateauthorityservice_certificatetemplate_get]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def get_certificate_template(
    project_id: str, location_id: str, certificate_template_id: str
) -> None:
    """Retrieve details of a certificate template.

    Args:
        project_id: The Google Cloud project ID hosting the certificate template.
        location_id: The Google Cloud region where the certificate template is hosted.
        certificate_template_id: The identifier of the certificate template.
    """
    client = privateca_v1.CertificateAuthorityServiceClient()
    name = f"projects/{project_id}/locations/{location_id}/certificateTemplates/{certificate_template_id}"

    try:
        response = client.get_certificate_template(name=name)
        print(f"Retrieved certificate template: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve certificate template: {error}")
# [END privateca_v1_certificateauthorityservice_certificatetemplate_get]
