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

# [START dialogflow_v3_securitysettingsservice_securitysettings_get]
import google.api_core.exceptions
from google.cloud import dialogflowcx_v3


def get_security_settings(
    project_id: str, location_id: str, security_settings_id: str
) -> None:
    """Retrieves the specified security settings.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        security_settings_id: The ID of the security settings (for example, 'default-security-settings').
    """
    name = f"projects/{project_id}/locations/{location_id}/securitySettings/{security_settings_id}"

    # Dialogflow CX regional endpoints require setting the client API endpoint
    if location_id != "global":
        client = dialogflowcx_v3.SecuritySettingsServiceClient(
            client_options={"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
        )
    else:
        client = dialogflowcx_v3.SecuritySettingsServiceClient()

    request = dialogflowcx_v3.GetSecuritySettingsRequest(name=name)

    try:
        response = client.get_security_settings(request=request)
        print(f"Retrieved security settings: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END dialogflow_v3_securitysettingsservice_securitysettings_get]
