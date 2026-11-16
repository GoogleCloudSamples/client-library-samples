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

# [START privateca_v1_certificateauthorityservice_certificatetemplate_delete]
import google.api_core.exceptions
from google.cloud.security import privateca_v1


def delete_certificate_template(
    project_id: str, location_id: str, certificate_template_id: str
) -> None:
    """Deletes a certificate template.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        certificate_template_id: ID of the CertificateTemplate (for example, 'example-certificatetemplate-id').
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    name = client.certificate_template_path(
        project_id, location_id, certificate_template_id
    )

    request = privateca_v1.DeleteCertificateTemplateRequest(
        name=name,
    )

    try:
        operation = client.delete_certificate_template(request=request)
        operation.result()
        print(f"Deleted certificate template: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete certificate template: {e}")


# [END privateca_v1_certificateauthorityservice_certificatetemplate_delete]
