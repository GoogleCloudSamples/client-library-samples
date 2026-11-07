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

# [START privateca_v1_certificateauthorityservice_certificatetemplates_list]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def list_certificate_templates(project_id: str, location_id: str) -> None:
    """Lists certificate templates in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = privateca_v1.ListCertificateTemplatesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_certificate_templates(request=request)
        for template in page_result:
            print(f"Certificate template: {template.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END privateca_v1_certificateauthorityservice_certificatetemplates_list]
