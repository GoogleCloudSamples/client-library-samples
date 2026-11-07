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

# [START dlp_v2_dlpservice_inspecttemplate_update]
import google.api_core.exceptions
from google.cloud import dlp_v2
from google.protobuf import field_mask_pb2

client = dlp_v2.DlpServiceClient()


def update_inspect_template(project_id: str, location_id: str, inspect_template_id: str) -> None:
    """Updates an existing Cloud DLP inspect template description.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or 'global'.
        inspect_template_id: The identifier of the inspect template to update.
    """
    name = f"projects/{project_id}/locations/{location_id}/inspectTemplates/{inspect_template_id}"
    inspect_template = dlp_v2.InspectTemplate(
        description="Updated description for inspect template"
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    request = dlp_v2.UpdateInspectTemplateRequest(
        name=name,
        inspect_template=inspect_template,
        update_mask=update_mask,
    )

    try:
        response = client.update_inspect_template(request=request)
        print(f"Updated template: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update inspect template: {error}")
# [END dlp_v2_dlpservice_inspecttemplate_update]
