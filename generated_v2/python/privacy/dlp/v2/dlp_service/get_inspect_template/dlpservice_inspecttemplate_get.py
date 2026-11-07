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

# [START dlp_v2_dlpservice_inspecttemplate_get]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def get_inspect_template(
    project_id: str, location_id: str, inspect_template_id: str
) -> None:
    """Retrieve an inspect template from Cloud Data Loss Prevention.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The geographic location where the inspect template is stored
            (for example, 'global' or 'us-central1').
        inspect_template_id: The identifier of the inspect template to retrieve.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/inspectTemplates/{inspect_template_id}"
    )

    try:
        response = client.get_inspect_template(request={"name": name})
        print(f"Inspect template retrieved: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.NotFound:
        print(f"Inspect template not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error.message}")
# [END dlp_v2_dlpservice_inspecttemplate_get]
