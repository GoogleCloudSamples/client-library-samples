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

# [START dialogflow_v3_securitysettingsservice_securitysettings_list]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def list_security_settings(project_id: str, location_id: str) -> None:
    """Lists security settings for a specified project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client_options = {
        "quota_project_id": project_id,
    }
    if location_id != "global":
        client_options["api_endpoint"] = f"{location_id}-dialogflow.googleapis.com"

    client = dialogflowcx_v3.SecuritySettingsServiceClient(
        client_options=client_options
    )

    parent = f"projects/{project_id}/locations/{location_id}"

    request = dialogflowcx_v3.ListSecuritySettingsRequest(
        parent=parent,
    )

    try:
        response = client.list_security_settings(request=request)
        for security_setting in response:
            print(f"Name: {security_setting.name}")
            print(f"Display Name: {security_setting.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as exception:
        print(f"API call failed: {exception}")
# [END dialogflow_v3_securitysettingsservice_securitysettings_list]
