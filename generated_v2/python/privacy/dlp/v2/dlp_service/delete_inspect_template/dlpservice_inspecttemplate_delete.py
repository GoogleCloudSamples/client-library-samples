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

# [START dlp_v2_dlpservice_inspecttemplate_delete]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def delete_inspect_template(
    project_id: str, location_id: str, inspect_template_id: str
) -> None:
    """Delete an inspect template in Sensitive Data Protection.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The processing location or region of the inspect template,
          or 'global'.
        inspect_template_id: The identifier of the inspect template to delete.
    """
    name = f"projects/{project_id}/locations/{location_id}/inspectTemplates/{inspect_template_id}"

    try:
        client.delete_inspect_template(name=name)
        print(f"Deleted inspect template: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error deleting inspect template: {error.message}")
# [END dlp_v2_dlpservice_inspecttemplate_delete]
