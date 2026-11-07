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

# [START dlp_list_inspect_templates]
import google.api_core.exceptions
from google.cloud import dlp_v2


def list_inspect_templates(project_id: str) -> None:
    """Lists Sensitive Data Protection inspect templates in a project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = dlp_v2.DlpServiceClient(
        client_options={"quota_project_id": project_id}
    )

    parent = f"projects/{project_id}"

    try:
        response = client.list_inspect_templates(request={"parent": parent})
        for template in response:
            print(f"Template name: {template.name}")
            print(f"Display name: {template.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dlp_list_inspect_templates]
