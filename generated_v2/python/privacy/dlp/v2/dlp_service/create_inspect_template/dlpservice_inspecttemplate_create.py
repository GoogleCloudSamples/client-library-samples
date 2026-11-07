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

# [START dlp_v2_dlpservice_inspecttemplate_create]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def create_inspect_template(project_id: str, location_id: str, template_id: str) -> None:
    """Creates an inspect template for sensitive data protection.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region or 'global' location for sensitive data protection processing (for example, 'global' or 'us-central1').
        template_id: The caller-chosen identifier to assign to the inspect template (for example, 'sample-inspect-template').
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    inspect_config = dlp_v2.InspectConfig(
        info_types=[
            dlp_v2.InfoType(name="EMAIL_ADDRESS"),
            dlp_v2.InfoType(name="PHONE_NUMBER"),
        ],
        min_likelihood=dlp_v2.Likelihood.LIKELY,
        include_quote=True,
    )

    inspect_template = dlp_v2.InspectTemplate(
        display_name="Sample Inspect Template",
        description="Inspect template detecting email addresses and phone numbers.",
        inspect_config=inspect_config,
    )

    request = dlp_v2.CreateInspectTemplateRequest(
        parent=parent,
        inspect_template=inspect_template,
        template_id=template_id,
    )

    try:
        response = client.create_inspect_template(request=request)
        print(f"Created inspect template: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API error occurred while creating inspect template: {e.message}")
# [END dlp_v2_dlpservice_inspecttemplate_create]
